import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Client } from '@/domain/client/enterprise/entities/client.entity';
import { Prisma, Client as PrismaClient } from '@prisma/client';

export class PrismaClientMapper {
  static toDomain(raw: PrismaClient): Client {
    return Client.create(
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

  static toPrisma(raw: Client): Prisma.ClientUncheckedCreateInput {
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
