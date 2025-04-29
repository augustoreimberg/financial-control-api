import { Body, Controller, Param, Put } from '@nestjs/common';
import { UpdateAccountUseCase } from '@/domain/account/application/use-cases/update-account.use-case';
import { Account } from '@/domain/account/enterprise/entities/account.entity';

@Controller('accounts')
export class UpdateAccountController {
  constructor(private updateAccountUseCase: UpdateAccountUseCase) {}

  @Put(':id')
  async handle(@Param('id') id: string, @Body() data: Partial<Account>) {
    return await this.updateAccountUseCase.execute({ id, data });
  }
}
