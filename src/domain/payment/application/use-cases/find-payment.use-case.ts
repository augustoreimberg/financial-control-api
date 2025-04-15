import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PaymentRepository } from '../repositories/payment-repository';
import { EnumPaymentStatus } from '@prisma/client';

interface FindPaymentUseCaseRequest {
  id?: string;
  policyId?: string;
  status?: EnumPaymentStatus;
  dueDateMonth?: number;
  dueDateYear?: number;
}

@Injectable()
export class FindPaymentUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  private validateRequest(request: FindPaymentUseCaseRequest) {
    if (request.dueDateMonth || request.dueDateYear) {
      if (!request.dueDateMonth || !request.dueDateYear) {
        throw new BadRequestException(
          'Para buscar por data de vencimento, é necessário informar tanto o mês quanto o ano',
        );
      }

      if (request.dueDateMonth < 1 || request.dueDateMonth > 12) {
        throw new BadRequestException('O mês deve estar entre 1 e 12');
      }

      if (request.dueDateYear < 1900 || request.dueDateYear > 2100) {
        throw new BadRequestException('O ano deve estar entre 1900 e 2100');
      }
    }

    if (
      request.status &&
      !Object.values(EnumPaymentStatus).includes(request.status)
    ) {
      throw new BadRequestException('Status de pagamento inválido');
    }

    if (request.id && !request.id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('ID inválido');
    }

    if (request.policyId && !request.policyId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('ID da apólice inválido');
    }
  }

  async execute(request: FindPaymentUseCaseRequest = {}) {
    try {
      this.validateRequest(request);

      let payments;

      if (request.id) {
        const payment = await this.paymentRepository.findById(request.id);
        if (!payment) {
          return { payments: [] };
        }
        payments = [payment];
      } else if (request.policyId) {
        payments = await this.paymentRepository.findByPolicyId(
          request.policyId,
        );
      } else if (request.status) {
        payments = await this.paymentRepository.findByStatus(request.status);
      } else if (request.dueDateMonth && request.dueDateYear) {
        payments = await this.paymentRepository.findByDueDateMonthAndYear(
          request.dueDateMonth,
          request.dueDateYear,
        );
      } else {
        payments = await this.paymentRepository.findAll();
      }

      const today = new Date();
      const updatedPayments = await Promise.all(
        payments.map(async (payment) => {
          if (
            payment.paymentStatus === EnumPaymentStatus.PENDING &&
            payment.dueDate < today
          ) {
            payment.paymentStatus = EnumPaymentStatus.DEFEATED;
            await this.paymentRepository.update(payment.id.toString(), payment);
          }
          return payment;
        }),
      );

      return { payments: updatedPayments };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error('Error in FindPaymentUseCase:', error);
      throw new BadRequestException('Erro ao buscar pagamentos');
    }
  }
}
