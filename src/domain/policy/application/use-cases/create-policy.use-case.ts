import { Injectable, BadRequestException } from "@nestjs/common"
import { PolicyRepository } from "../repositories/policy-repository"
import { PaymentRepository } from "@/domain/payment/application/repositories/payment-repository"
import { Policy, type ResponsibleData } from "../../enterprise/entities/policy.entity"
import { Payment } from "@/domain/payment/enterprise/entities/payment.entity"
import { EnumFrequency, type EnumPaymentMethod, EnumPaymentStatus } from "@prisma/client"

interface CreatePolicyUseCaseRequest {
  name: string
  clientId: string
  responsible: ResponsibleData
  productId: string
  policyNumber: string
  validity: Date
  frequency: EnumFrequency
  monthlyPremium?: number
  annualPremium?: number
  paymentMethod: EnumPaymentMethod
  dueDate: Date
}

@Injectable()
export class CreatePolicyUseCase {
  constructor(
    private policyRepository: PolicyRepository,
    private paymentRepository: PaymentRepository,
  ) {}

  async execute(request: CreatePolicyUseCaseRequest) {
    try {
      // Validate required fields
      if (!request.name) {
        throw new BadRequestException("Policy name is required")
      }

      if (!request.clientId) {
        throw new BadRequestException("Client ID is required")
      }

      if (!request.productId) {
        throw new BadRequestException("Product ID is required")
      }

      if (!request.policyNumber) {
        throw new BadRequestException("Policy number is required")
      }

      if (!request.validity) {
        throw new BadRequestException("Validity date is required")
      }

      if (!request.dueDate) {
        throw new BadRequestException("Due date is required")
      }

      // Validate responsible field
      if (!request.responsible) {
        throw new BadRequestException("Responsible is required")
      }

      if (!request.responsible.advisor || typeof request.responsible.advisor !== "string") {
        throw new BadRequestException("Responsible must have a valid advisor ID")
      }

      if (!request.responsible.broker || typeof request.responsible.broker !== "string") {
        throw new BadRequestException("Responsible must have a valid broker ID")
      }

      // Validate frequency-specific premium
      if (request.frequency === EnumFrequency.MONTHLY && !request.monthlyPremium) {
        throw new BadRequestException("Monthly premium is required for monthly frequency")
      }

      if (request.frequency === EnumFrequency.ANNUAL && !request.annualPremium) {
        throw new BadRequestException("Annual premium is required for annual frequency")
      }

      // Create policy
      const policy = Policy.create({
        name: request.name,
        clientId: request.clientId,
        responsible: request.responsible,
        productId: request.productId,
        policyNumber: request.policyNumber,
        validity: request.validity,
        frequency: request.frequency,
        monthlyPremium: request.monthlyPremium,
        annualPremium: request.annualPremium,
        paymentMethod: request.paymentMethod,
        dueDate: request.dueDate,
      })

      await this.policyRepository.create(policy)

      // Create payments based on frequency
      const payments: Payment[] = []

      if (request.frequency === EnumFrequency.MONTHLY) {
        // Create 12 monthly payments
        const monthlyAmount = request.monthlyPremium

        // Create parent payment
        const parentPayment = Payment.create({
          policyId: policy.id.toString(),
          plot: "Full",
          price: monthlyAmount * 12,
          paymentStatus: EnumPaymentStatus.PENDING,
          dueDate: new Date(request.dueDate), // Use policy due date for parent payment
        })

        await this.paymentRepository.create(parentPayment)

        // Create 12 child payments
        for (let i = 1; i <= 12; i++) {
          const paymentDueDate = new Date(request.dueDate)
          paymentDueDate.setMonth(paymentDueDate.getMonth() + i - 1)

          const payment = Payment.create({
            policyId: policy.id.toString(),
            plot: `${i}/12`,
            price: monthlyAmount,
            paymentStatus: EnumPaymentStatus.PENDING,
            parentId: parentPayment.id.toString(),
            dueDate: paymentDueDate, // Set specific due date for each monthly payment
          })

          payments.push(payment)
        }
      } else if (request.frequency === EnumFrequency.ANNUAL) {
        // Create a single annual payment
        const payment = Payment.create({
          policyId: policy.id.toString(),
          plot: "1/1",
          price: request.annualPremium,
          paymentStatus: EnumPaymentStatus.PENDING,
          dueDate: new Date(request.dueDate), // Use policy due date
        })

        payments.push(payment)
      }

      if (payments.length > 0) {
        await this.paymentRepository.createMany(payments)
      }

      return { policy }
    } catch (error) {
      console.error("Error in CreatePolicyUseCase:", error)
      throw error
    }
  }
}

