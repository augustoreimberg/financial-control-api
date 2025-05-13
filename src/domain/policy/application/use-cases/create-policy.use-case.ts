import { Injectable, BadRequestException } from '@nestjs/common';
import { PolicyRepository } from '../repositories/policy-repository';
import { PaymentRepository } from '@/domain/payment/application/repositories/payment-repository';
import { Policy } from '../../enterprise/entities/policy.entity';
import { Payment } from '@/domain/payment/enterprise/entities/payment.entity';
import {
  EnumFrequency,
  type EnumPaymentMethod,
  EnumPaymentStatus,
} from '@prisma/client';

interface CreatePolicyUseCaseRequest {
  name: string;
  accountId: string;
  productId: string;
  policyNumber: string;
  validity: Date;
  frequency: EnumFrequency;
  monthlyPremium?: number;
  annualPremium?: number;
  paymentMethod: EnumPaymentMethod;
  dueDate: Date;
  paymentDay?: number;
}

@Injectable()
export class CreatePolicyUseCase {
  constructor(
    private policyRepository: PolicyRepository,
    private paymentRepository: PaymentRepository,
  ) {}

  async execute(request: CreatePolicyUseCaseRequest) {
    try {
      if (!request.name) {
        throw new BadRequestException('Policy name is required');
      }

      if (!request.accountId) {
        throw new BadRequestException('Account ID is required');
      }

      if (!request.productId) {
        throw new BadRequestException('Product ID is required');
      }

      if (!request.policyNumber) {
        throw new BadRequestException('Policy number is required');
      }

      if (!request.validity) {
        throw new BadRequestException('Validity date is required');
      }

      if (!request.dueDate) {
        throw new BadRequestException('Due date is required');
      }

      if (request.dueDate > request.validity) {
        throw new BadRequestException('Due date cannot be after validity date');
      }

      if (
        request.paymentDay &&
        (request.paymentDay < 1 || request.paymentDay > 31)
      ) {
        throw new BadRequestException('Payment day must be between 1 and 31');
      }

      if (
        request.frequency === EnumFrequency.MONTHLY &&
        !request.monthlyPremium
      ) {
        throw new BadRequestException(
          'Monthly premium is required for monthly frequency',
        );
      }

      if (
        request.frequency === EnumFrequency.ANNUAL &&
        !request.annualPremium
      ) {
        throw new BadRequestException(
          'Annual premium is required for annual frequency',
        );
      }

      const policy = Policy.create({
        name: request.name,
        accountId: request.accountId,
        productId: request.productId,
        policyNumber: request.policyNumber,
        validity: request.validity,
        frequency: request.frequency,
        monthlyPremium: request.monthlyPremium,
        annualPremium: request.annualPremium,
        paymentMethod: request.paymentMethod,
        dueDate: request.dueDate,
      });

      await this.policyRepository.create(policy);

      const payments: Payment[] = [];

      if (request.frequency === EnumFrequency.MONTHLY) {
        const monthlyAmount = request.monthlyPremium;

        const startDate = new Date(request.dueDate);
        const endDate = new Date(request.validity);
        const monthsDiff =
          (endDate.getFullYear() - startDate.getFullYear()) * 12 +
          (endDate.getMonth() - startDate.getMonth());
        const totalMonths = Math.max(1, monthsDiff);

        const parentPayment = Payment.create({
          policyId: policy.id.toString(),
          plot: 'Full',
          price: monthlyAmount * totalMonths,
          paymentStatus: EnumPaymentStatus.PENDING,
          dueDate: endDate,
        });

        await this.paymentRepository.create(parentPayment);

        for (let i = 1; i <= totalMonths; i++) {
          const paymentDueDate = new Date(request.dueDate);
          paymentDueDate.setMonth(paymentDueDate.getMonth() + i - 1);

          if (request.paymentDay) {
            paymentDueDate.setDate(request.paymentDay);
          }

          const payment = Payment.create({
            policyId: policy.id.toString(),
            plot: `${i}/${totalMonths}`,
            price: monthlyAmount,
            paymentStatus: EnumPaymentStatus.PENDING,
            parentId: parentPayment.id.toString(),
            dueDate: paymentDueDate,
          });

          payments.push(payment);
        }
      } else if (request.frequency === EnumFrequency.ANNUAL) {
        const paymentDueDate = new Date(request.dueDate);

        if (request.paymentDay) {
          paymentDueDate.setDate(request.paymentDay);
        }

        const payment = Payment.create({
          policyId: policy.id.toString(),
          plot: '1/1',
          price: request.annualPremium,
          paymentStatus: EnumPaymentStatus.PENDING,
          dueDate: paymentDueDate,
        });

        payments.push(payment);
      }

      if (payments.length > 0) {
        await this.paymentRepository.createMany(payments);
      }

      return { policy };
    } catch (error) {
      console.error('Error in CreatePolicyUseCase:', error);
      throw error;
    }
  }
}
