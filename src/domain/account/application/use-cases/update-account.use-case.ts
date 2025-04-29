import { Injectable, BadRequestException } from '@nestjs/common';
import { AccountRepository } from '../repositories/account-repository';
import { Account } from '../../enterprise/entities/account.entity';

interface UpdateAccountUseCaseRequest {
  id: string;
  data: Partial<Account>;
}

@Injectable()
export class UpdateAccountUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute({ id, data }: UpdateAccountUseCaseRequest) {
    try {
      const account = await this.accountRepository.findById(id);

      if (!account) {
        throw new BadRequestException('Account not found');
      }

      if (data.name) account.name = data.name;
      if (data.email) account.email = data.email;
      if (data.sinacorCode) account.sinacorCode = data.sinacorCode;
      if (data.accountNumber) account.accountNumber = data.accountNumber;

      await this.accountRepository.update(id, account);

      return { account };
    } catch (error) {
      console.error('Error in UpdateAccountUseCase:', error);
      throw error;
    }
  }
}
