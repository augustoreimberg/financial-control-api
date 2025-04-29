import { Injectable, BadRequestException } from '@nestjs/common';
import { AccountRepository } from '../repositories/account-repository';

interface DeleteAccountUseCaseRequest {
  id: string;
}

@Injectable()
export class DeleteAccountUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute({ id }: DeleteAccountUseCaseRequest) {
    try {
      const account = await this.accountRepository.findById(id);

      if (!account) {
        throw new BadRequestException('Account not found');
      }

      await this.accountRepository.delete(id);

      return { message: 'Account deleted successfully' };
    } catch (error) {
      console.error('Error in DeleteAccountUseCase:', error);
      throw error;
    }
  }
}
