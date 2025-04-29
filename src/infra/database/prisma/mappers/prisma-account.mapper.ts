import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Account } from '@/domain/account/enterprise/entities/account.entity';
import { Prisma, Account as PrismaAccount } from '@prisma/client';

export class PrismaAccountMapper {
  static toDomain(raw: PrismaAccount): Account {
    return Account.create(
      {
        name: raw.name,
        email: raw.email,
        sinacorCode: raw.sinacorCode,
        accountNumber: raw.accountNumber,
        createdAt: raw.createdAt,
        deletedAt: raw.deletedAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
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
}
