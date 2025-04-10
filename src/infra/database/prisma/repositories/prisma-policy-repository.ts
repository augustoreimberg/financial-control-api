import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma.service"
import { PolicyRepository } from "@/domain/policy/application/repositories/policy-repository"
import { PrismaPolicyMapper } from "../mappers/prisma-policy.mapper"
import { Policy } from "@/domain/policy/enterprise/entities/policy.entity"

@Injectable()
export class PrismaPolicyRepository implements PolicyRepository {
  constructor(private prisma: PrismaService) {}

  async create(policy: Policy): Promise<void> {
    const data = PrismaPolicyMapper.toPrisma(policy)

    await this.prisma.policy.create({
      data,
    })
  }

  async findById(id: string): Promise<Policy | null> {
    const policy = await this.prisma.policy.findUnique({
      where: { id },
    })

    if (!policy) {
      return null
    }

    return PrismaPolicyMapper.toDomain(policy)
  }

  async findAll(): Promise<Policy[]> {
    const policies = await this.prisma.policy.findMany({
      orderBy: { createdAt: "desc" },
    })

    return policies.map(PrismaPolicyMapper.toDomain)
  }

  async update(id: string, data: Partial<Policy>): Promise<void> {
    const updateData: any = {}

    if (data.name !== undefined) updateData.name = data.name
    if (data.clientId !== undefined) updateData.clientId = data.clientId
    if (data.responsible !== undefined) updateData.responsible = data.responsible
    if (data.productId !== undefined) updateData.productId = data.productId
    if (data.policyNumber !== undefined) updateData.policyNumber = data.policyNumber
    if (data.validity !== undefined) updateData.validity = data.validity
    if (data.frequency !== undefined) updateData.frequency = data.frequency
    if (data.monthlyPremium !== undefined) updateData.monthlyPremium = data.monthlyPremium
    if (data.annualPremium !== undefined) updateData.annualPremium = data.annualPremium
    if (data.paymentMethod !== undefined) updateData.paymentMethod = data.paymentMethod
    if (data.dueDate !== undefined) updateData.dueDate = data.dueDate

    updateData.updatedAt = new Date()

    await this.prisma.policy.update({
      where: { id },
      data: updateData,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.policy.delete({
      where: { id },
    })
  }
}

