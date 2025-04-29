import { Body, Controller, Post } from '@nestjs/common';
import { CreateAccountUseCase } from '@/domain/account/application/use-cases/create-account.use-case';

interface CreateAccountBody {
  name: string;
  email: string;
  sinacorCode: string;
  accountNumber: string;
}

@Controller('accounts')
export class CreateAccountController {
  constructor(private createAccountUseCase: CreateAccountUseCase) {}

  @Post()
  async handle(@Body() data: CreateAccountBody) {
    return await this.createAccountUseCase.execute(data);
  }
}
