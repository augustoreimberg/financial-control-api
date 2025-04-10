import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common"
import { PolicyRepository } from "../repositories/policy-repository"

interface DeletePolicyUseCaseRequest {
  id: string
}

@Injectable()
export class DeletePolicyUseCase {
  constructor(private policyRepository: PolicyRepository) {}

  async execute(request: DeletePolicyUseCaseRequest) {
    try {
      if (!request.id) {
        throw new BadRequestException("Policy ID is required")
      }

      const policy = await this.policyRepository.findById(request.id)

      if (!policy) {
        throw new NotFoundException("Policy not found")
      }

      await this.policyRepository.delete(request.id)

      return { success: true }
    } catch (error) {
      console.error("Error in DeletePolicyUseCase:", error)
      throw error
    }
  }
}

