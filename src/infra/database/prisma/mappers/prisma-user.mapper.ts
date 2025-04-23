import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/user/enterprise/entities/user.entity'
import { Prisma, User as PrismaUser, EnumUserRole } from '@prisma/client'

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password || '',
        role: raw.role,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt || null,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(raw: User): Prisma.UserUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      name: raw.name,
      email: raw.email,
      password: raw.password,
      role: raw.role as EnumUserRole,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt || null,
    }
  }
}
