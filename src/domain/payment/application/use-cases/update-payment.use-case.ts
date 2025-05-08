import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common"
import { PaymentRepository } from "../repositories/payment-repository"
import { EnumPaymentStatus } from "@prisma/client"

interface UpdatePaymentUseCaseRequest {
  id: string
  paymentStatus?: EnumPaymentStatus
  price?: number
  paymentDate?: Date
}

@Injectable()
export class UpdatePaymentUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(request: UpdatePaymentUseCaseRequest) {
    try {
      if (!request.id) {
        throw new BadRequestException("Payment ID is required")
      }

      const payment = await this.paymentRepository.findById(request.id)

      if (!payment) {
        throw new NotFoundException("Payment not found")
      }

      const updateData: Partial<typeof payment> = {}

      if (request.paymentStatus !== undefined) updateData.paymentStatus = request.paymentStatus
      if (request.price !== undefined) updateData.price = request.price
      if (request.paymentDate !== undefined) {
        updateData.paymentDate = request.paymentDate;
      }

      await this.paymentRepository.update(request.id, updateData)

      const updatedPayment = await this.paymentRepository.findById(request.id)

      return { payment: updatedPayment }
    } catch (error) {
      console.error("Error in UpdatePaymentUseCase:", error)
      throw error
    }
  }
}

