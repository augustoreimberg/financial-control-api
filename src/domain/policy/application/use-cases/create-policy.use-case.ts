import { Injectable, BadRequestException } from '@nestjs/common';
import { PolicyRepository } from '../repositories/policy-repository';
import { PaymentRepository } from '@/domain/payment/application/repositories/payment-repository';
import {
  Policy,
  type ResponsibleData,
} from '../../enterprise/entities/policy.entity';
import { Payment } from '@/domain/payment/enterprise/entities/payment.entity';
import {
  EnumFrequency,
  type EnumPaymentMethod,
  EnumPaymentStatus,
  EnumUserRole,
} from '@prisma/client';
import { UserRepository } from '@/domain/user/application/repositories/user-repository';

interface CreatePolicyUseCaseRequest {
  name: string;
  clientId: string;
  productId: string;
  policyNumber: string;
  validity: Date;
  frequency: EnumFrequency;
  monthlyPremium?: number;
  annualPremium?: number;
  paymentMethod: EnumPaymentMethod;
  dueDate: Date;
}

@Injectable()
export class CreatePolicyUseCase {
  constructor(
    private policyRepository: PolicyRepository,
    private paymentRepository: PaymentRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(request: CreatePolicyUseCaseRequest) {
    try {
      // Validate required fields
      if (!request.name) {
        throw new BadRequestException('Policy name is required');
      }

      if (!request.clientId) {
        throw new BadRequestException('Client ID is required');
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

      // Find advisor and broker assigned to the client
      const users = await this.userRepository.findByClientId(request.clientId);

      const advisor = users.find((user) => user.role === EnumUserRole.ADVISOR);
      const broker = users.find((user) => user.role === EnumUserRole.BROKER);

      if (!advisor) {
        throw new BadRequestException('No advisor assigned to this client');
      }

      if (!broker) {
        throw new BadRequestException('No broker assigned to this client');
      }

      const responsible: ResponsibleData = {
        advisor: advisor.id.toString(),
        broker: broker.id.toString(),
      };

      // Validate frequency-specific premium
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

      // Create policy
      const policy = Policy.create({
        name: request.name,
        clientId: request.clientId,
        responsible,
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

      // Create payments based on frequency
      const payments: Payment[] = [];

      if (request.frequency === EnumFrequency.MONTHLY) {
        // Create 12 monthly payments
        const monthlyAmount = request.monthlyPremium;

        // Calculate last payment date
        const lastPaymentDate = new Date(request.dueDate);
        lastPaymentDate.setMonth(lastPaymentDate.getMonth() + 11);

        // Create parent payment
        const parentPayment = Payment.create({
          policyId: policy.id.toString(),
          plot: 'Full',
          price: monthlyAmount * 12,
          paymentStatus: EnumPaymentStatus.PENDING,
          dueDate: lastPaymentDate,
        });

        await this.paymentRepository.create(parentPayment);

        // Create 12 child payments
        for (let i = 1; i <= 12; i++) {
          const paymentDueDate = new Date(request.dueDate);
          paymentDueDate.setMonth(paymentDueDate.getMonth() + i - 1);

          const payment = Payment.create({
            policyId: policy.id.toString(),
            plot: `${i}/12`,
            price: monthlyAmount,
            paymentStatus: EnumPaymentStatus.PENDING,
            parentId: parentPayment.id.toString(),
            dueDate: paymentDueDate,
          });

          payments.push(payment);
        }
      } else if (request.frequency === EnumFrequency.ANNUAL) {
        // Create a single annual payment
        const payment = Payment.create({
          policyId: policy.id.toString(),
          plot: '1/1',
          price: request.annualPremium,
          paymentStatus: EnumPaymentStatus.PENDING,
          dueDate: new Date(request.dueDate),
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
