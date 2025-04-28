import { Body, Controller, Param, Put } from '@nestjs/common';
import { UpdateClientUseCase } from '@/domain/client/application/use-cases/update-client.use-case';
import { Client } from '@/domain/client/enterprise/entities/client.entity';

@Controller('clients')
export class UpdateClientController {
  constructor(private updateClientUseCase: UpdateClientUseCase) {}

  @Put(':id')
  async handle(@Param('id') id: string, @Body() data: Partial<Client>) {
    return await this.updateClientUseCase.execute({ id, data });
  }
}
