import { Injectable, BadRequestException } from '@nestjs/common';
import { ClientRepository } from '../repositories/client-repository';

interface DeleteClientUseCaseRequest {
  id: string;
}

@Injectable()
export class DeleteClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute({ id }: DeleteClientUseCaseRequest) {
    try {
      const client = await this.clientRepository.findById(id);

      if (!client) {
        throw new BadRequestException('Client not found');
      }

      await this.clientRepository.delete(id);

      return { message: 'Client deleted successfully' };
    } catch (error) {
      console.error('Error in DeleteClientUseCase:', error);
      throw error;
    }
  }
}
