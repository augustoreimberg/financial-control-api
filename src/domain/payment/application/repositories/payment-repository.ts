import type { Payment } from '../../enterprise/entities/payment.entity';
import type { EnumPaymentStatus } from '@prisma/client';

export abstract class PaymentRepository {
  abstract create(data: Payment): Promise<void>;
  abstract createMany(data: Payment[]): Promise<void>;
  abstract findById(id: string): Promise<Payment | null>;
  abstract findByPolicyId(policyId: string): Promise<Payment[]>;
  abstract findByStatus(status: EnumPaymentStatus): Promise<Payment[]>;
  abstract findByDueDateMonthAndYear(
    month: number,
    year: number,
  ): Promise<Payment[]>;
  abstract findAll(): Promise<Payment[]>;
  abstract update(id: string, data: Partial<Payment>): Promise<void>;
  abstract delete(id: string): Promise<void>;

  // New methods
  abstract findUpcomingPayments(days: number): Promise<Payment[]>;
  abstract findOverduePayments(): Promise<Payment[]>;
  abstract updateOverduePaymentsStatus(): Promise<number>; // Returns count of updated payments
}
