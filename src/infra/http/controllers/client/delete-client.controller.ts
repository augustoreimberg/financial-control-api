import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteClientUseCase } from '@/domain/client/application/use-cases/delete-client.use-case';

@Controller('clients')
export class DeleteClientController {
  constructor(private deleteClientUseCase: DeleteClientUseCase) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    return await this.deleteClientUseCase.execute({ id });
  }
}
