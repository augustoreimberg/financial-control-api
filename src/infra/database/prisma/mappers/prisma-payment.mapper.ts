import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Payment } from "@/domain/payment/enterprise/entities/payment.entity"
import type { Prisma, Payment as PrismaPayment } from "@prisma/client"

export class PrismaPaymentMapper {
  static toDomain(raw: PrismaPayment): Payment {
    return Payment.create(
      {
        policyId: raw.policyId,
        plot: raw.plot,
        price: raw.price,
        paymentStatus: raw.paymentStatus,
        parentId: raw.parentId || undefined,
        dueDate: raw.dueDate,
        paymentDate: raw.paymentDate || undefined,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt || undefined,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(raw: Payment): Prisma.PaymentUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      policyId: raw.policyId,
      plot: raw.plot,
      price: raw.price,
      paymentStatus: raw.paymentStatus,
      parentId: raw.parentId || null,
      dueDate: raw.dueDate,
      paymentDate: raw.paymentDate || null,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt || null,
    }
  }
}

