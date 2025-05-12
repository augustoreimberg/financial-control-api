import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Account } from '@/domain/account/enterprise/entities/account.entity';
import { Prisma, Account as PrismaAccount, UserAccount } from '@prisma/client';

export class PrismaAccountMapper {
  static toDomain(raw: PrismaAccount & { users?: { user: any }[] }): Account {
    const account = Account.create(
      {
        name: raw.name,
        email: raw.email,
        sinacorCode: raw.sinacorCode,
        accountNumber: raw.accountNumber,
        createdAt: raw.createdAt,
        deletedAt: raw.deletedAt,
        updatedAt: raw.updatedAt,
        users: raw.users?.map((userAccount) => userAccount.user) || [],
      },
      new UniqueEntityID(raw.id),
    );

    return account;
  }

  static toPrisma(raw: Account): Prisma.AccountUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      name: raw.name.toString(),
      email: raw.email.toString(),
      sinacorCode: raw.sinacorCode.toString(),
      accountNumber: raw.accountNumber.toString(),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }

  static toHTTP(account: Account) {
    return {
      id: account.id.toString(),
      name: account.name,
      email: account.email,
      sinacorCode: account.sinacorCode,
      accountNumber: account.accountNumber,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
      deletedAt: account.deletedAt,
      users: account.users,
    };
  }
}
