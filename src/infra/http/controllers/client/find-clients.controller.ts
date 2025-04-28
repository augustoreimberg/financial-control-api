import { Controller, Get, Query } from '@nestjs/common';
import { FindClientsUseCase } from '@/domain/client/application/use-cases/find-clients.use-case';
import { EnumUserRole } from '@prisma/client';

@Controller('clients')
export class FindClientsController {
  constructor(private findClientsUseCase: FindClientsUseCase) {}

  @Get()
  async handle(
    @Query('id') id?: string,
    @Query('email') email?: string,
    @Query('sinacorCode') sinacorCode?: string,
    @Query('accountNumber') accountNumber?: string,
    @Query('role') role?: EnumUserRole,
    @Query('userId') userId?: string,
  ) {
    return await this.findClientsUseCase.execute({
      id,
      email,
      sinacorCode,
      accountNumber,
      role,
      userId,
    });
  }
}
