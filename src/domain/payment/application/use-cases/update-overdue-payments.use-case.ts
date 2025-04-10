import { Injectable } from "@nestjs/common"
import { PaymentRepository } from "../repositories/payment-repository"

@Injectable()
export class UpdateOverduePaymentsUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute() {
    try {
      const updatedCount = await this.paymentRepository.updateOverduePaymentsStatus()

      return {
        success: true,
        updatedCount,
      }
    } catch (error) {
      console.error("Error in UpdateOverduePaymentsUseCase:", error)
      throw error
    }
  }
}

