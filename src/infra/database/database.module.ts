import { Module } from "@nestjs/common"
import { PrismaService } from "./prisma/prisma.service"
import { PrismaUserRepository } from "./prisma/repositories/prisma-user-repository"
import { UserRepository } from "@/domain/user/application/repositories/user-repository"
import { PolicyRepository } from "@/domain/policy/application/repositories/policy-repository"
import { PaymentRepository } from "@/domain/payment/application/repositories/payment-repository"
import { PrismaPolicyRepository } from "./prisma/repositories/prisma-policy-repository"
import { PrismaPaymentRepository } from "./prisma/repositories/prisma-payment-repository"

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: PolicyRepository,
      useClass: PrismaPolicyRepository,
    },
    {
      provide: PaymentRepository,
      useClass: PrismaPaymentRepository,
    },
  ],
  exports: [UserRepository, PolicyRepository, PaymentRepository],
})
export class DatabaseModule {}

