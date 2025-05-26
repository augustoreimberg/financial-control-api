import { Injectable } from '@nestjs/common';
import { PaymentRepository } from '../repositories/payment-repository';

@Injectable()
export class FindOverduePaymentsUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute() {
    try {
      const payments = await this.paymentRepository.findOverduePayments();

      return { payments };
    } catch (error) {
      console.error('Error in FindOverduePaymentsUseCase:', error);
      throw error;
    }
  }
}
