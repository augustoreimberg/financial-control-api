import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PaymentRepository } from '../repositories/payment-repository';
import { EnumPaymentStatus } from '@prisma/client';

interface UpdatePaymentUseCaseRequest {
  id: string;
  paymentStatus?: EnumPaymentStatus;
  price?: number;
  paymentDate?: Date;
  dueDate?: Date;
}

@Injectable()
export class UpdatePaymentUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(request: UpdatePaymentUseCaseRequest) {
    try {
      if (!request.id) {
        throw new BadRequestException('Payment ID is required');
      }

      const payment = await this.paymentRepository.findById(request.id);

      if (!payment) {
        throw new NotFoundException('Payment not found');
      }

      const updateData: Partial<typeof payment> = {};

      if (request.paymentStatus !== undefined)
        updateData.paymentStatus = request.paymentStatus;
      if (request.price !== undefined) updateData.price = request.price;
      if (request.paymentDate !== undefined) {
        updateData.paymentDate = request.paymentDate;
      }
      if (request.dueDate !== undefined) {
        updateData.dueDate = request.dueDate;
      }
      await this.paymentRepository.update(request.id, updateData);

      if (request.dueDate !== undefined) {
        const futurePayments = await this.paymentRepository.findByPolicyId(
          payment.policyId,
        );

        const paymentsToUpdate = futurePayments.filter(
          (futurePayment) => futurePayment.dueDate > payment.dueDate,
        );

        const newDay = request.dueDate.getUTCDate();

        for (const futurePayment of paymentsToUpdate) {
          const futureDueDate = new Date(futurePayment.dueDate);
          futureDueDate.setUTCDate(newDay);

          await this.paymentRepository.update(futurePayment.id.toString(), {
            dueDate: futureDueDate,
          });
        }
      }

      const updatedPayment = await this.paymentRepository.findById(request.id);

      return { payment: updatedPayment };
    } catch (error) {
      console.error('Error in UpdatePaymentUseCase:', error);
      throw error;
    }
  }
}
