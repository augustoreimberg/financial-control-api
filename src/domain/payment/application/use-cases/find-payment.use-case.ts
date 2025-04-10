import { Injectable, NotFoundException } from "@nestjs/common"
import { PaymentRepository } from "../repositories/payment-repository"
import { EnumPaymentStatus } from "@prisma/client"

interface FindPaymentUseCaseRequest {
  id?: string
  policyId?: string
  status?: EnumPaymentStatus
}

@Injectable()
export class FindPaymentUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(request: FindPaymentUseCaseRequest = {}) {
    try {
      if (request.id) {
        const payment = await this.paymentRepository.findById(request.id)

        if (!payment) {
          throw new NotFoundException("Payment not found")
        }

        return { payment }
      }

      if (request.policyId) {
        const payments = await this.paymentRepository.findByPolicyId(request.policyId)
        return { payments }
      }

      if (request.status) {
        const payments = await this.paymentRepository.findByStatus(request.status)
        return { payments }
      }

      const payments = await this.paymentRepository.findAll()
      return { payments }
    } catch (error) {
      console.error("Error in FindPaymentUseCase:", error)
      throw error
    }
  }
}

