import { Injectable, BadRequestException } from '@nestjs/common';
import { ClientRepository } from '../repositories/client-repository';
import { Client } from '../../enterprise/entities/client.entity';

interface CreateClientUseCaseRequest {
  name: string;
  email: string;
  sinacorCode: string;
  accountNumber: string;
}

@Injectable()
export class CreateClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute(data: CreateClientUseCaseRequest) {
    try {
      const client = Client.create({
        name: data.name,
        email: data.email,
        sinacorCode: data.sinacorCode,
        accountNumber: data.accountNumber,
        updatedAt: new Date(),
        deletedAt: null,
      });

      await this.clientRepository.create(client);

      return { client };
    } catch (error) {
      console.error('Error in CreateClientUseCase:', error);
      throw error;
    }
  }
}
