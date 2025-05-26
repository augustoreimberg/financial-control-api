import { Injectable } from '@nestjs/common';
import { PaymentRepository } from '../repositories/payment-repository';

interface FindUpcomingPaymentsUseCaseRequest {
  days?: number;
}

@Injectable()
export class FindUpcomingPaymentsUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(request: FindUpcomingPaymentsUseCaseRequest = {}) {
    try {
      const days = request.days || 10;

      const payments = await this.paymentRepository.findUpcomingPayments(days);

      return { payments };
    } catch (error) {
      console.error('Error in FindUpcomingPaymentsUseCase:', error);
      throw error;
    }
  }
}
