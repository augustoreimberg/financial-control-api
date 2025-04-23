import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ClientRepository } from "@/domain/client/application/repositories/client-repository";
import { PrismaClientMapper } from "../mappers/prisma-client.mapper";
import { Client } from "@/domain/client/enterprise/entities/client.entity";

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

    // findByBrokerId(brokerId: string): Promise<Client[] | null> {
    //     const client = this.prisma.client.findMany({
    //         where: { brokerId },
    //     })
    // }
}