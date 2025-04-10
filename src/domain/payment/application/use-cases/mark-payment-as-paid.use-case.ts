import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common"
import { PaymentRepository } from "../repositories/payment-repository"
import { EnumPaymentStatus } from "@prisma/client"

interface MarkPaymentAsPaidUseCaseRequest {
  id: string
  paymentDate?: Date
}

@Injectable()
export class MarkPaymentAsPaidUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(request: MarkPaymentAsPaidUseCaseRequest) {
    try {
      if (!request.id) {
        throw new BadRequestException("Payment ID is required")
      }

      const payment = await this.paymentRepository.findById(request.id)

      if (!payment) {
        throw new NotFoundException("Payment not found")
      }

      const paymentDate = request.paymentDate || new Date()

      await this.paymentRepository.update(request.id, {
        paymentStatus: EnumPaymentStatus.PAID,
        paymentDate,
      })

      const updatedPayment = await this.paymentRepository.findById(request.id)

      return { payment: updatedPayment }
    } catch (error) {
      console.error("Error in MarkPaymentAsPaidUseCase:", error)
      throw error
    }
  }
}

