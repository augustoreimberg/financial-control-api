import { BadRequestException, Injectable } from '@nestjs/common';
import { ClientRepository } from '../repositories/client-repository';
import { EnumUserRole } from '@prisma/client';

interface FindClientsUseCaseRequest {
  id?: string;
  email?: string;
  sinacorCode?: string;
  accountNumber?: string;
  role?: EnumUserRole;
  userId?: string;
}

@Injectable()
export class FindClientsUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute({
    id,
    email,
    sinacorCode,
    accountNumber,
    role,
    userId,
  }: FindClientsUseCaseRequest) {
    try {
      if (id) {
        if (typeof id !== 'string') {
          throw new BadRequestException('Invalid user ID.');
        }
        const client = await this.clientRepository.findById(id);
        if (!client) {
          throw new BadRequestException('Client not found.');
        }
        return { client };
      }

      if (email) {
        if (typeof email !== 'string') {
          throw new BadRequestException('Invalid email format.');
        }
        const client = await this.clientRepository.findByEmail(email);
        if (!client) {
          throw new BadRequestException('Client not found.');
        }
        return { client };
      }

      if (sinacorCode) {
        if (typeof sinacorCode !== 'string') {
          throw new BadRequestException('Invalid sinacor code format.');
        }
        const client =
          await this.clientRepository.findBySinacorCode(sinacorCode);
        if (!client) {
          throw new BadRequestException('Client not found.');
        }
        return { client };
      }

      if (accountNumber) {
        if (typeof accountNumber !== 'string') {
          throw new BadRequestException('Invalid account number format.');
        }
        const client =
          await this.clientRepository.findByAccountNumber(accountNumber);
        if (!client) {
          throw new BadRequestException('Client not found.');
        }
        return { client };
      }

      if (role && userId) {
        if (role !== 'ADVISOR' && role !== 'BROKER') {
          throw new BadRequestException(
            'Role must be either ADVISOR or BROKER',
          );
        }

        let clients;
        if (role === 'ADVISOR') {
          clients = await this.clientRepository.findByAdvisorId(userId);
        } else {
          clients = await this.clientRepository.findByBrokerId(userId);
        }

        if (!clients) {
          throw new BadRequestException('No clients found for this user');
        }

        return { clients };
      }

      const clients = await this.clientRepository.findAll();
      return { clients };
    } catch (error) {
      console.error('Error in FindClientsUseCase:', error);
      throw error;
    }
  }
}
