import { Injectable, BadRequestException } from '@nestjs/common';
import { AccountRepository } from '../repositories/account-repository';
import { Account } from '../../enterprise/entities/account.entity';

interface CreateAccountUseCaseRequest {
  name: string;
  email: string;
  sinacorCode: string;
  accountNumber: string;
}

@Injectable()
export class CreateAccountUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute(data: CreateAccountUseCaseRequest) {
    try {
      const account = Account.create({
        name: data.name,
        email: data.email,
        sinacorCode: data.sinacorCode,
        accountNumber: data.accountNumber,
        updatedAt: new Date(),
        deletedAt: null,
      });

      await this.accountRepository.create(account);

      return { account };
    } catch (error) {
      console.error('Error in CreateAccountUseCase:', error);
      throw error;
    }
  }
}
