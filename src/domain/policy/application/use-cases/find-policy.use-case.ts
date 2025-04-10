import { Injectable, NotFoundException } from "@nestjs/common"
import { PolicyRepository } from "../repositories/policy-repository"

interface FindPolicyUseCaseRequest {
  id?: string
}

@Injectable()
export class FindPolicyUseCase {
  constructor(private policyRepository: PolicyRepository) {}

  async execute(request: FindPolicyUseCaseRequest = {}) {
    try {
      if (request.id) {
        const policy = await this.policyRepository.findById(request.id)

        if (!policy) {
          throw new NotFoundException("Policy not found")
        }

        return { policy }
      }

      const policies = await this.policyRepository.findAll()
      return { policies }
    } catch (error) {
      console.error("Error in FindPolicyUseCase:", error)
      throw error
    }
  }
}

