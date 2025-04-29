import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { UserAccountRepository } from "@/domain/userAccount/application/repositories/userAccount-repository";
import { PrismaUserAccountMapper } from "../mappers/prisma-userAccount.mapper";
import { UserAccount } from "@/domain/userAccount/enterprise/entities/userAccount.entity";

@Injectable()
export class PrismaUserAccountRepository implements UserAccountRepository {
    constructor(private prisma: PrismaService) {}

    async create(userAccount: UserAccount): Promise<void> {
        const data = PrismaUserAccountMapper.toPrisma(userAccount);

        await this.prisma.userAccount.create({
            data,
        });
    }
}