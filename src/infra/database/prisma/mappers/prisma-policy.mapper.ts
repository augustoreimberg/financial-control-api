import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Policy } from "@/domain/policy/enterprise/entities/policy.entity"
import type { Prisma, Policy as PrismaPolicy } from "@prisma/client"

export class PrismaPolicyMapper {
  static toDomain(raw: PrismaPolicy): Policy {
    return Policy.create(
      {
        name: raw.name,
        clientId: raw.clientId,
        responsible: raw.responsible as any,
        productId: raw.productId,
        policyNumber: raw.policyNumber,
        validity: raw.validity,
        frequency: raw.frequency,
        monthlyPremium: raw.monthlyPremium || undefined,
        annualPremium: raw.annualPremium || undefined,
        paymentMethod: raw.paymentMethod,
        dueDate: raw.dueDate,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt || undefined,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(raw: Policy): Prisma.PolicyUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      name: raw.name,
      clientId: raw.clientId,
      responsible: raw.responsible as any,
      productId: raw.productId,
      policyNumber: raw.policyNumber,
      validity: raw.validity,
      frequency: raw.frequency,
      monthlyPremium: raw.monthlyPremium || null,
      annualPremium: raw.annualPremium || null,
      paymentMethod: raw.paymentMethod,
      dueDate: raw.dueDate,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt || null,
    }
  }
}

