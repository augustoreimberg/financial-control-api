import { Account } from '../../enterprise/entities/account.entity';

export abstract class AccountRepository {
  abstract create(account: Account): Promise<void>;
  abstract findById(id: string): Promise<Account | null>;
  abstract findByEmail(email: string): Promise<Account | null>;
  abstract findBySinacorCode(sinacorCode: string): Promise<Account | null>;
  abstract findByAccountNumber(accountNumber: string): Promise<Account | null>;
  abstract findByBrokerId(brokerId: string): Promise<Account[] | null>;
  abstract findByAdvisorId(advisorId: string): Promise<Account[] | null>;
  abstract findAll(): Promise<Account[]>;
  abstract update(id: string, account: Account): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
