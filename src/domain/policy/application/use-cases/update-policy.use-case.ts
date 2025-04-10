import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common"
import { PolicyRepository } from "../repositories/policy-repository"
import { EnumFrequency, EnumPaymentMethod } from "@prisma/client"
import { ResponsibleData } from "../../enterprise/entities/policy.entity"

interface UpdatePolicyUseCaseRequest {
  id: string
  name?: string
  clientId?: string
  responsible?: ResponsibleData
  productId?: string
  policyNumber?: string
  validity?: Date
  frequency?: EnumFrequency
  monthlyPremium?: number
  annualPremium?: number
  paymentMethod?: EnumPaymentMethod
  dueDate?: Date
}

@Injectable()
export class UpdatePolicyUseCase {
  constructor(private policyRepository: PolicyRepository) {}

  async execute(request: UpdatePolicyUseCaseRequest) {
    try {
      if (!request.id) {
        throw new BadRequestException("Policy ID is required")
      }

      const policy = await this.policyRepository.findById(request.id)

      if (!policy) {
        throw new NotFoundException("Policy not found")
      }

      // Validate responsible field if provided
      if (request.responsible) {
        if (!request.responsible.advisor || typeof request.responsible.advisor !== "string") {
          throw new BadRequestException("Responsible must have a valid advisor ID")
        }

        if (!request.responsible.broker || typeof request.responsible.broker !== "string") {
          throw new BadRequestException("Responsible must have a valid broker ID")
        }
      }

      // Update only provided fields
      const updateData: Partial<typeof policy> = {}

      if (request.name !== undefined) updateData.name = request.name
      if (request.clientId !== undefined) updateData.clientId = request.clientId
      if (request.responsible !== undefined) updateData.responsible = request.responsible
      if (request.productId !== undefined) updateData.productId = request.productId
      if (request.policyNumber !== undefined) updateData.policyNumber = request.policyNumber
      if (request.validity !== undefined) updateData.validity = request.validity
      if (request.frequency !== undefined) updateData.frequency = request.frequency
      if (request.monthlyPremium !== undefined) updateData.monthlyPremium = request.monthlyPremium
      if (request.annualPremium !== undefined) updateData.annualPremium = request.annualPremium
      if (request.paymentMethod !== undefined) updateData.paymentMethod = request.paymentMethod
      if (request.dueDate !== undefined) updateData.dueDate = request.dueDate

      await this.policyRepository.update(request.id, updateData)

      const updatedPolicy = await this.policyRepository.findById(request.id)

      return { policy: updatedPolicy }
    } catch (error) {
      console.error("Error in UpdatePolicyUseCase:", error)
      throw error
    }
  }
}

