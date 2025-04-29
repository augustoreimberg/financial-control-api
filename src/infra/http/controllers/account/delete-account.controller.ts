import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteAccountUseCase } from '@/domain/account/application/use-cases/delete-account.use-case';

@Controller('accounts')
export class DeleteAccountController {
  constructor(private deleteAccountUseCase: DeleteAccountUseCase) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    return await this.deleteAccountUseCase.execute({ id });
  }
}
