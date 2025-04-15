import { Injectable, NotFoundException } from '@nestjs/common';
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

  async execute(request: FindPaymentUseCaseRequest = {}) {
    try {
      let payments;

      if (request.id) {
        const payment = await this.paymentRepository.findById(request.id);

        if (!payment) {
          throw new NotFoundException('Payment not found');
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
      console.error('Error in FindPaymentUseCase:', error);
      throw error;
    }
  }
}
