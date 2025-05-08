import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PaymentRepository } from '../repositories/payment-repository';
import { PolicyRepository } from '@/domain/policy/application/repositories/policy-repository';
import { AccountRepository } from '@/domain/account/application/repositories/account-repository';
import { ProductRepository } from '@/domain/product/application/repositories/product-repository';
import { EnumPaymentStatus } from '@prisma/client';
import { PaymentWithPolicyInfo } from '../repositories/payment-with-policy-info.dto';

interface FindPaymentUseCaseRequest {
  id?: string;
  policyId?: string;
  status?: EnumPaymentStatus;
  dueDateMonth?: number;
  dueDateYear?: number;
}

interface FindPaymentUseCaseResponse {
  payments: PaymentWithPolicyInfo[];
}

@Injectable()
export class FindPaymentUseCase {
  constructor(
    private paymentRepository: PaymentRepository,
    private policyRepository: PolicyRepository,
    private accountRepository: AccountRepository,
    private productRepository: ProductRepository,
  ) {}

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

  private async mapPaymentToResponse(
    payment: any,
    policy: any,
  ): Promise<PaymentWithPolicyInfo> {
    const account = await this.accountRepository.findById(policy.accountId);
    if (!account) {
      throw new NotFoundException(`Account not found for policy ${policy.id}`);
    }

    const product = await this.productRepository.findById(policy.productId);
    if (!product) {
      throw new NotFoundException(`Product not found for policy ${policy.id}`);
    }

    return {
      id: payment._id.value,
      policyId: payment.props.policyId,
      policyNumber: policy.policyNumber,
      accountId: policy.accountId,
      accountName: account.name.toString(),
      productId: policy.productId,
      productName: product.name,
      plot: payment.props.plot,
      price: payment.props.price,
      paymentStatus: payment.props.paymentStatus,
      parentId: payment.props.parentId,
      dueDate: payment.props.dueDate,
      paymentDate: payment.props.paymentDate,
      createdAt: payment.props.createdAt,
      updatedAt: payment.props.updatedAt,
    };
  }

  async execute(
    request: FindPaymentUseCaseRequest = {},
  ): Promise<FindPaymentUseCaseResponse> {
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
            payment.props.paymentStatus === EnumPaymentStatus.PENDING &&
            payment.props.dueDate < today
          ) {
            payment.props.paymentStatus = EnumPaymentStatus.DEFEATED;
            await this.paymentRepository.update(payment._id.value, payment);
          }
          return payment;
        }),
      );

      const paymentsWithPolicyInfo = await Promise.all(
        updatedPayments.map(async (payment) => {
          const policy = await this.policyRepository.findById(
            payment.props.policyId,
          );

          if (!policy) {
            throw new NotFoundException(
              `Policy not found for payment ${payment._id.value}`,
            );
          }

          return this.mapPaymentToResponse(payment, policy);
        }),
      );

      return { payments: paymentsWithPolicyInfo };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      console.error('Error in FindPaymentUseCase:', error);
      throw new BadRequestException('Erro ao buscar pagamentos');
    }
  }
}
