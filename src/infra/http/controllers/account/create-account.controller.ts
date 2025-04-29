import {
  Body,
  Controller,
  Post,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CreateAccountUseCase } from '@/domain/account/application/use-cases/create-account.use-case';

interface CreateAccountBody {
  account: {
    name: string;
    email: string;
    sinacorCode: string;
    accountNumber: string;
  };
  users: {
    advisorId: string;
    brokerId: string;
  };
}

@Controller('accounts')
export class CreateAccountController {
  constructor(private createAccountUseCase: CreateAccountUseCase) {}

  @Post()
  async handle(@Body() data: CreateAccountBody) {
    if (!data.users.advisorId || !data.users.brokerId) {
      throw new BadRequestException('Advisor ID and Broker ID are required');
    }

    return await this.createAccountUseCase.execute(
      data.account,
      data.users.advisorId,
      data.users.brokerId,
    );
  }
}
