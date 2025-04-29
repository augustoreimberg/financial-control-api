import { Injectable, BadRequestException } from '@nestjs/common';
import { AccountRepository } from '../repositories/account-repository';
import { UserRepository } from '@/domain/user/application/repositories/user-repository';
import { UserAccountRepository } from '@/domain/userAccount/application/repositories/userAccount-repository';
import { Account } from '../../enterprise/entities/account.entity';
import { UserAccount } from '@/domain/userAccount/enterprise/entities/userAccount.entity';

interface CreateAccountUseCaseRequest {
  name: string;
  email: string;
  sinacorCode: string;
  accountNumber: string;
}

@Injectable()
export class CreateAccountUseCase {
  constructor(
    private accountRepository: AccountRepository,
    private userRepository: UserRepository,
    private userAccountRepository: UserAccountRepository,
  ) {}

  async execute(
    data: CreateAccountUseCaseRequest,
    advisorId: string,
    brokerId: string,
  ) {
    try {
      const account = Account.create({
        name: data.name,
        email: data.email,
        sinacorCode: data.sinacorCode,
        accountNumber: data.accountNumber,
        updatedAt: new Date(),
        deletedAt: null,
      });

      const verifyAdivisor = await this.userRepository.findById(advisorId);
      const verifyBroker = await this.userRepository.findById(brokerId);

      if (!verifyAdivisor || !verifyBroker) {
        throw new BadRequestException('Advisor or Broker not found');
      }

      await this.accountRepository.create(account);

      const advisorUserAccount = UserAccount.create({
        userId: advisorId,
        accountId: account.id.toString(),
      });

      const brokerUserAccount = UserAccount.create({
        userId: brokerId,
        accountId: account.id.toString(),
      });

      await this.userAccountRepository.create(advisorUserAccount);
      await this.userAccountRepository.create(brokerUserAccount);

      return { account };
    } catch (error) {
      console.error('Error in CreateAccountUseCase:', error);
      throw error;
    }
  }
}
