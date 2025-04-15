import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PaymentRepository } from '@/domain/payment/application/repositories/payment-repository';
import { PrismaPaymentMapper } from '../mappers/prisma-payment.mapper';
import { Payment } from '@/domain/payment/enterprise/entities/payment.entity';
import { EnumPaymentStatus } from '@prisma/client';

@Injectable()
export class PrismaPaymentRepository implements PaymentRepository {
  constructor(private prisma: PrismaService) {}

  async create(payment: Payment): Promise<void> {
    const data = PrismaPaymentMapper.toPrisma(payment);

    await this.prisma.payment.create({
      data,
    });
  }

  async createMany(payments: Payment[]): Promise<void> {
    const data = payments.map(PrismaPaymentMapper.toPrisma);

    await this.prisma.payment.createMany({
      data,
    });
  }

  async findById(id: string): Promise<Payment | null> {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    });

    if (!payment) {
      return null;
    }

    return PrismaPaymentMapper.toDomain(payment);
  }

  async findByPolicyId(policyId: string): Promise<Payment[]> {
    const payments = await this.prisma.payment.findMany({
      where: { policyId },
      orderBy: { dueDate: 'asc' },
    });

    return payments.map(PrismaPaymentMapper.toDomain);
  }

  async findByStatus(status: EnumPaymentStatus): Promise<Payment[]> {
    const payments = await this.prisma.payment.findMany({
      where: { paymentStatus: status },
      orderBy: { dueDate: 'asc' },
    });

    return payments.map(PrismaPaymentMapper.toDomain);
  }

  async findAll(): Promise<Payment[]> {
    const payments = await this.prisma.payment.findMany({
      orderBy: { dueDate: 'asc' },
    });

    return payments.map(PrismaPaymentMapper.toDomain);
  }

  async update(id: string, data: Partial<Payment>): Promise<void> {
    const updateData: any = {};

    if (data.paymentStatus !== undefined)
      updateData.paymentStatus = data.paymentStatus;
    if (data.price !== undefined) updateData.price = data.price;
    if (data.dueDate !== undefined) updateData.dueDate = data.dueDate;
    if (data.paymentDate !== undefined)
      updateData.paymentDate = data.paymentDate;

    updateData.updatedAt = new Date();

    await this.prisma.payment.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.payment.delete({
      where: { id },
    });
  }

  async findUpcomingPayments(days: number): Promise<Payment[]> {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + days);

    const payments = await this.prisma.payment.findMany({
      where: {
        dueDate: {
          gte: today,
          lte: endDate,
        },
        paymentStatus: EnumPaymentStatus.PENDING,
      },
      orderBy: { dueDate: 'asc' },
    });

    return payments.map(PrismaPaymentMapper.toDomain);
  }

  async findOverduePayments(): Promise<Payment[]> {
    const today = new Date();

    const payments = await this.prisma.payment.findMany({
      where: {
        dueDate: {
          lt: today,
        },
        paymentStatus: EnumPaymentStatus.PENDING,
      },
      orderBy: { dueDate: 'asc' },
    });

    return payments.map(PrismaPaymentMapper.toDomain);
  }

  async updateOverduePaymentsStatus(): Promise<number> {
    const today = new Date();

    const result = await this.prisma.payment.updateMany({
      where: {
        dueDate: {
          lt: today,
        },
        paymentStatus: EnumPaymentStatus.PENDING,
      },
      data: {
        paymentStatus: EnumPaymentStatus.DEFEATED,
        updatedAt: today,
      },
    });

    return result.count;
  }

  async findByDueDateMonthAndYear(
    month: number,
    year: number,
  ): Promise<Payment[]> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const payments = await this.prisma.payment.findMany({
      where: {
        dueDate: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return payments.map((payment) => Payment.create(payment));
  }
}
