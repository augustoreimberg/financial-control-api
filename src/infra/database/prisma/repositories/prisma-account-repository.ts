import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AccountRepository } from '@/domain/account/application/repositories/account-repository';
import { PrismaAccountMapper } from '../mappers/prisma-account.mapper';
import { Account } from '@/domain/account/enterprise/entities/account.entity';

@Injectable()
export class PrismaAccountRepository implements AccountRepository {
  constructor(private prisma: PrismaService) {}

  async create(account: Account): Promise<void> {
    const data = PrismaAccountMapper.toPrisma(account);

    await this.prisma.account.create({
      data,
    });
  }

  async findById(id: string): Promise<Account | null> {
    const account = await this.prisma.account.findUnique({
      where: { id },
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!account) {
      return null;
    }

    return PrismaAccountMapper.toDomain(account);
  }

  async findByEmail(email: string): Promise<Account | null> {
    const account = await this.prisma.account.findFirst({
      where: { email },
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!account) {
      return null;
    }

    return PrismaAccountMapper.toDomain(account);
  }

  async findBySinacorCode(sinacorCode: string): Promise<Account | null> {
    const account = await this.prisma.account.findFirst({
      where: { sinacorCode },
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!account) {
      return null;
    }

    return PrismaAccountMapper.toDomain(account);
  }

  async findByAccountNumber(accountNumber: string): Promise<Account | null> {
    const account = await this.prisma.account.findFirst({
      where: { accountNumber },
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!account) {
      return null;
    }

    return PrismaAccountMapper.toDomain(account);
  }

  async findByBrokerId(brokerId: string): Promise<Account[] | null> {
    const userAccounts = await this.prisma.userAccount.findMany({
      where: {
        user: {
          id: brokerId,
          role: 'BROKER',
        },
      },
      include: {
        account: {
          include: {
            users: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    if (!userAccounts.length) {
      return null;
    }

    return userAccounts.map((userAccount) =>
      PrismaAccountMapper.toDomain(userAccount.account),
    );
  }

  async findByAdvisorId(advisorId: string): Promise<Account[] | null> {
    const userAccounts = await this.prisma.userAccount.findMany({
      where: {
        user: {
          id: advisorId,
          role: 'ADVISOR',
        },
      },
      include: {
        account: {
          include: {
            users: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    if (!userAccounts.length) {
      return null;
    }

    return userAccounts.map((userAccount) =>
      PrismaAccountMapper.toDomain(userAccount.account),
    );
  }

  async findAll(): Promise<Account[]> {
    const accounts = await this.prisma.account.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
    });

    return accounts.map((account) => PrismaAccountMapper.toDomain(account));
  }

  async update(id: string, account: Account): Promise<void> {
    const data = PrismaAccountMapper.toPrisma(account);

    await this.prisma.account.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.account.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
