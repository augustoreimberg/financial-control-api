import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { UserAccount } from '@/domain/userAccount/enterprise/entities/userAccount.entity';
import { UserAccount as PrismaUserAccount } from '@prisma/client';

export class PrismaUserAccountMapper {
  static toDomain(userAccount: PrismaUserAccount): UserAccount {
    return UserAccount.create(
      {
        userId: userAccount.userId,
        accountId: userAccount.accountId,
        createdAt: userAccount.createdAt,
        updatedAt: userAccount.updatedAt,
      },
      new UniqueEntityID(userAccount.id),
    );
  }

  static toPrisma(userAccount: UserAccount): PrismaUserAccount {
    return {
      id: userAccount.id.toString(),
      userId: userAccount.userId,
      accountId: userAccount.accountId,
      createdAt: userAccount.createdAt,
      updatedAt: userAccount.updatedAt,
    };
  }
}
