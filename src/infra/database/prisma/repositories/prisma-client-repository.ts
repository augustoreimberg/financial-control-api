import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ClientRepository } from '@/domain/client/application/repositories/client-repository';
import { PrismaClientMapper } from '../mappers/prisma-client.mapper';
import { Client } from '@/domain/client/enterprise/entities/client.entity';

@Injectable()
export class PrismaClientRepository implements ClientRepository {
  constructor(private prisma: PrismaService) {}

  async create(client: Client): Promise<void> {
    const data = PrismaClientMapper.toPrisma(client);

    await this.prisma.client.create({
      data,
    });
  }

  async findById(id: string): Promise<Client | null> {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      return null;
    }

    return PrismaClientMapper.toDomain(client);
  }

  async findByEmail(email: string): Promise<Client | null> {
    const client = await this.prisma.client.findFirst({
      where: { email },
    });

    if (!client) {
      return null;
    }

    return PrismaClientMapper.toDomain(client);
  }

  async findBySinacorCode(sinacorCode: string): Promise<Client | null> {
    const client = await this.prisma.client.findFirst({
      where: { sinacorCode },
    });

    if (!client) {
      return null;
    }

    return PrismaClientMapper.toDomain(client);
  }

  async findByAccountNumber(accountNumber: string): Promise<Client | null> {
    const client = await this.prisma.client.findFirst({
      where: { accountNumber },
    });

    if (!client) {
      return null;
    }

    return PrismaClientMapper.toDomain(client);
  }

  async findByBrokerId(brokerId: string): Promise<Client[] | null> {
    const userClients = await this.prisma.userClient.findMany({
      where: {
        user: {
          id: brokerId,
          role: 'BROKER',
        },
      },
      include: {
        client: true,
      },
    });

    if (!userClients.length) {
      return null;
    }

    return userClients.map((userClient) =>
      PrismaClientMapper.toDomain(userClient.client),
    );
  }

  async findByAdvisorId(advisorId: string): Promise<Client[] | null> {
    const userClients = await this.prisma.userClient.findMany({
      where: {
        user: {
          id: advisorId,
          role: 'ADVISOR',
        },
      },
      include: {
        client: true,
      },
    });

    if (!userClients.length) {
      return null;
    }

    return userClients.map((userClient) =>
      PrismaClientMapper.toDomain(userClient.client),
    );
  }

  async findAll(): Promise<Client[]> {
    const clients = await this.prisma.client.findMany({
      where: {
        deletedAt: null,
      },
    });

    return clients.map((client) => PrismaClientMapper.toDomain(client));
  }

  async update(id: string, client: Client): Promise<void> {
    const data = PrismaClientMapper.toPrisma(client);

    await this.prisma.client.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.client.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
