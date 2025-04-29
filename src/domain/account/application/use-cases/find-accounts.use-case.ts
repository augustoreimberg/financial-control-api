import { BadRequestException, Injectable } from '@nestjs/common';
import { AccountRepository } from '../repositories/account-repository';
import { EnumUserRole } from '@prisma/client';

interface FindAccountsUseCaseRequest {
  id?: string;
  email?: string;
  sinacorCode?: string;
  accountNumber?: string;
  role?: EnumUserRole;
  userId?: string;
}

@Injectable()
export class FindAccountsUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute({
    id,
    email,
    sinacorCode,
    accountNumber,
    role,
    userId,
  }: FindAccountsUseCaseRequest) {
    try {
      if (id) {
        if (typeof id !== 'string') {
          throw new BadRequestException('Invalid user ID.');
        }
        const account = await this.accountRepository.findById(id);
        if (!account) {
          throw new BadRequestException('Account not found.');
        }
        return { account };
      }

      if (email) {
        if (typeof email !== 'string') {
          throw new BadRequestException('Invalid email format.');
        }
        const account = await this.accountRepository.findByEmail(email);
        if (!account) {
          throw new BadRequestException('Account not found.');
        }
        return { account };
      }

      if (sinacorCode) {
        if (typeof sinacorCode !== 'string') {
          throw new BadRequestException('Invalid sinacor code format.');
        }
        const account =
          await this.accountRepository.findBySinacorCode(sinacorCode);
        if (!account) {
          throw new BadRequestException('Account not found.');
        }
        return { account };
      }

      if (accountNumber) {
        if (typeof accountNumber !== 'string') {
          throw new BadRequestException('Invalid account number format.');
        }
        const account =
          await this.accountRepository.findByAccountNumber(accountNumber);
        if (!account) {
          throw new BadRequestException('Account not found.');
        }
        return { account };
      }

      if (role && userId) {
        if (role !== 'ADVISOR' && role !== 'BROKER') {
          throw new BadRequestException(
            'Role must be either ADVISOR or BROKER',
          );
        }

        let accounts;
        if (role === 'ADVISOR') {
          accounts = await this.accountRepository.findByAdvisorId(userId);
        } else {
          accounts = await this.accountRepository.findByBrokerId(userId);
        }

        if (!accounts) {
          throw new BadRequestException('No accounts found for this user');
        }

        return { accounts };
      }

      const accounts = await this.accountRepository.findAll();
      return { accounts };
    } catch (error) {
      console.error('Error in FindAccountsUseCase:', error);
      throw error;
    }
  }
}
