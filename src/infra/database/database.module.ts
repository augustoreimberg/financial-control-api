import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';
import { UserRepository } from '@/domain/user/application/repositories/user-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository, 
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class DatabaseModule {}
