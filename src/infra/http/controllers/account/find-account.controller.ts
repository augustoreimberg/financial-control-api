import { Controller, Get, Query } from '@nestjs/common';
import { FindAccountsUseCase } from '@/domain/account/application/use-cases/find-accounts.use-case';
import { EnumUserRole } from '@prisma/client';

@Controller('accounts')
export class FindAccountsController {
  constructor(private findAccountsUseCase: FindAccountsUseCase) {}

  @Get()
  async handle(
    @Query('id') id?: string,
    @Query('email') email?: string,
    @Query('sinacorCode') sinacorCode?: string,
    @Query('accountNumber') accountNumber?: string,
    @Query('role') role?: EnumUserRole,
    @Query('userId') userId?: string,
  ) {
    return await this.findAccountsUseCase.execute({
      id,
      email,
      sinacorCode,
      accountNumber,
      role,
      userId,
    });
  }
}
