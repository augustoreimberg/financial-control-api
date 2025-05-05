import { Injectable } from '@nestjs/common';
import { PaymentRepository } from '../repositories/payment-repository';
import { EnumPaymentStatus } from '@prisma/client';

export interface PaymentsMetricsOutput {
  total: number;
  paid: number;
  pending: number;
  defeated: number;
}

@Injectable()
export class GetPaymentsMetricsUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(): Promise<PaymentsMetricsOutput> {
    const [total, paid, pending, defeated] = await Promise.all([
      this.paymentRepository.countAll(),
      this.paymentRepository.countByStatus(EnumPaymentStatus.PAID),
      this.paymentRepository.countByStatus(EnumPaymentStatus.PENDING),
      this.paymentRepository.countByStatus(EnumPaymentStatus.DEFEATED),
    ]);

    return { total, paid, pending, defeated };
  }
}
