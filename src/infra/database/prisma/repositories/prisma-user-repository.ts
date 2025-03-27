import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { UserRepository } from '@/domain/user/application/repositories/user-repository'
import { PrismaUserMapper } from '../mappers/prisma-user.mapper'
import { User } from '@/domain/user/enterprise/entities/user.entity'

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.create({
      data,
    })
  }

}
