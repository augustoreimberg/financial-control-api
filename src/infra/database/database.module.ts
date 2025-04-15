import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';
import { UserRepository } from '@/domain/user/application/repositories/user-repository';
import { PolicyRepository } from '@/domain/policy/application/repositories/policy-repository';
import { PrismaPolicyRepository } from './prisma/repositories/prisma-policy-repository';
import { PaymentRepository } from '@/domain/payment/application/repositories/payment-repository';
import { PrismaPaymentRepository } from './prisma/repositories/prisma-payment-repository';
import { ProductRepository } from '@/domain/product/application/repositories/product-repository';
import { PrismaProductRepository } from './prisma/repositories/prisma-product-repository';

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
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository,
    },
  ],
  exports: [
    PrismaService,
    UserRepository,
    PolicyRepository,
    PaymentRepository,
    ProductRepository,
  ],
})
export class DatabaseModule {}
