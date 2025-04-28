import { Body, Controller, Post } from '@nestjs/common';
import { CreateClientUseCase } from '@/domain/client/application/use-cases/create-client.use-case';

interface CreateClientBody {
  name: string;
  email: string;
  sinacorCode: string;
  accountNumber: string;
}

@Controller('clients')
export class CreateClientController {
  constructor(private createClientUseCase: CreateClientUseCase) {}

  @Post()
  async handle(@Body() data: CreateClientBody) {
    return await this.createClientUseCase.execute(data);
  }
}
