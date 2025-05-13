import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtStrategy } from '../auth/jwt.strategy ';
import { HeatlhCheckController } from './controllers/health.controller';
import { CreateUserController } from './controllers/user/create.user.controller';
import { FindUsersController } from './controllers/user/find.users.controller';
import { UpdateUserController } from './controllers/user/update.user.controller';
import { DeleteUserController } from './controllers/user/delete.user.controller';
import { LoginController } from './controllers/auth/login.controller';
import { MeController } from './controllers/auth/me.controller';
import { CreatePolicyController } from './controllers/policy/create-policy.controller';
import { FindPolicyController } from './controllers/policy/find-policy.controller';
import { UpdatePolicyController } from './controllers/policy/update-policy.controller';
import { DeletePolicyController } from './controllers/policy/delete-policy.controller';
import { FindPaymentController } from './controllers/payment/find-payment.controller';
import { UpdatePaymentController } from './controllers/payment/update-payment.controller';
import { PaymentManagementController } from './controllers/payment/payment-management.controller';
import { CreateProductController } from './controllers/products/create-product.controller';
import { DeleteProductController } from './controllers/products/delete-product.controller';
import { FindProductController } from './controllers/products/find-product.controller';
import { UpdateProductController } from './controllers/products/update-product.controller';
import { CreateAccountController } from './controllers/account/create-account.controller';
import { FindAccountsController } from './controllers/account/find-account.controller';
import { GetPaymentsMetricsController } from './controllers/payment/find-payments-metrics.controller';
import { UpdateAccountController } from './controllers/account/update-account.controller';

import { CreateUserUseCase } from '@/domain/user/application/use-cases/create-user.use-case';
import { FindUsersUseCase } from '@/domain/user/application/use-cases/find-users.use-case';
import { UpdateUserUseCase } from '@/domain/user/application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '@/domain/user/application/use-cases/delete-user.use-case';
import { LoginUseCase } from '@/domain/auth/application/use-cases/login.use-case';
import { CreatePolicyUseCase } from '@/domain/policy/application/use-cases/create-policy.use-case';
import { FindPolicyUseCase } from '@/domain/policy/application/use-cases/find-policy.use-case';
import { UpdatePolicyUseCase } from '@/domain/policy/application/use-cases/update-policy.use-case';
import { DeletePolicyUseCase } from '@/domain/policy/application/use-cases/delete-policy.use-case';
import { FindPaymentUseCase } from '@/domain/payment/application/use-cases/find-payment.use-case';
import { UpdatePaymentUseCase } from '@/domain/payment/application/use-cases/update-payment.use-case';
import { FindUpcomingPaymentsUseCase } from '@/domain/payment/application/use-cases/find-upcoming-payments.use-case';
import { FindOverduePaymentsUseCase } from '@/domain/payment/application/use-cases/find-overdue-payments.use-case';
import { UpdateOverduePaymentsUseCase } from '@/domain/payment/application/use-cases/update-overdue-payments.use-case';
import { MarkPaymentAsPaidUseCase } from '@/domain/payment/application/use-cases/mark-payment-as-paid.use-case';
import { CreateProductUseCase } from '@/domain/product/application/use-cases/create-product.use-case';
import { DeleteProductUseCase } from '@/domain/product/application/use-cases/delete-product.use-case';
import { FindProductUseCase } from '@/domain/product/application/use-cases/find-product.use-case';
import { UpdateProductUseCase } from '@/domain/product/application/use-cases/update-product.use-case';
import { CreateAccountUseCase } from '@/domain/account/application/use-cases/create-account.use-case';
import { ProductRepository } from '@/domain/product/application/repositories/product-repository';
import { PrismaProductRepository } from '@/infra/database/prisma/repositories/prisma-product-repository';
import { AccountRepository } from '@/domain/account/application/repositories/account-repository';
import { PrismaAccountRepository } from '@/infra/database/prisma/repositories/prisma-account-repository';
import { UserAccountRepository } from '@/domain/userAccount/application/repositories/userAccount-repository';
import { PrismaUserAccountRepository } from '@/infra/database/prisma/repositories/prisma-userAccount-repository';
import { FindAccountsUseCase } from '@/domain/account/application/use-cases/find-accounts.use-case';
import { GetPaymentsMetricsUseCase } from '@/domain/payment/application/use-cases/find-payments-metrics.use-case';
import { PaymentRepository } from '@/domain/payment/application/repositories/payment-repository';
import { PrismaPaymentRepository } from '../database/prisma/repositories/prisma-payment-repository';
import { PolicyRepository } from '@/domain/policy/application/repositories/policy-repository';
import { PrismaPolicyRepository } from '../database/prisma/repositories/prisma-policy-repository';
import { UpdateAccountUseCase } from '@/domain/account/application/use-cases/update-account.use-case';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [
    HeatlhCheckController,
    CreateUserController,
    FindUsersController,
    UpdateUserController,
    DeleteUserController,
    LoginController,
    MeController,
    CreatePolicyController,
    FindPolicyController,
    UpdatePolicyController,
    DeletePolicyController,
    FindPaymentController,
    UpdatePaymentController,
    PaymentManagementController,
    CreateProductController,
    DeleteProductController,
    FindProductController,
    UpdateProductController,
    CreateAccountController,
    FindAccountsController,
    GetPaymentsMetricsController,
    UpdateAccountController,
  ],
  providers: [
    CreateUserUseCase,
    FindUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    LoginUseCase,
    CreatePolicyUseCase,
    FindPolicyUseCase,
    UpdatePolicyUseCase,
    DeletePolicyUseCase,
    FindPaymentUseCase,
    UpdatePaymentUseCase,
    FindUpcomingPaymentsUseCase,
    FindOverduePaymentsUseCase,
    UpdateOverduePaymentsUseCase,
    MarkPaymentAsPaidUseCase,
    CreateProductUseCase,
    DeleteProductUseCase,
    FindProductUseCase,
    UpdateProductUseCase,
    CreateAccountUseCase,
    FindAccountsUseCase,
    GetPaymentsMetricsUseCase,
    UpdateAccountUseCase,
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository,
    },
    {
      provide: AccountRepository,
      useClass: PrismaAccountRepository,
    },
    {
      provide: UserAccountRepository,
      useClass: PrismaUserAccountRepository,
    },
    {
      provide: PaymentRepository,
      useClass: PrismaPaymentRepository,
    },
    {
      provide: PolicyRepository,
      useClass: PrismaPolicyRepository,
    },
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class HttpModule {}
