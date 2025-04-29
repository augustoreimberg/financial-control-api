import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserRepository } from '@/domain/user/application/repositories/user-repository';
import { PrismaUserMapper } from '../mappers/prisma-user.mapper';
import { User } from '@/domain/user/enterprise/entities/user.entity';
import { EnumUserRole } from '@prisma/client';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data,
    });
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async findByName(name: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { name },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async findByRole(role: EnumUserRole): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: { role },
    });

    return users.map(PrismaUserMapper.toDomain);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return users.map(PrismaUserMapper.toDomain);
  }

  async update(id: string, data: Partial<User>): Promise<void> {
    const updateData: any = {};

    if (data.email !== undefined) updateData.email = data.email;
    if (data.password !== undefined) updateData.password = data.password;
    if (data.role !== undefined) updateData.role = data.role;

    updateData.updatedAt = new Date();

    await this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async isUserAssignedToAccount(
    userId: string,
    accountId: string,
  ): Promise<boolean> {
    const userAccount = await this.prisma.userAccount.findUnique({
      where: {
        userId_accountId: {
          userId,
          accountId,
        },
      },
    });

    return !!userAccount;
  }

  async findByAccountId(accountId: string): Promise<User[]> {
    const userAccounts = await this.prisma.userAccount.findMany({
      where: { accountId },
      include: { user: true },
    });

    return userAccounts.map((userAccount) =>
      PrismaUserMapper.toDomain(userAccount.user),
    );
  }
}
