import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy ';
import { LoginUseCase } from '@/domain/auth/application/use-cases/login.use-case';
import { ValidateUserUseCase } from '@/domain/auth/application/use-cases/validate-user.use-case';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [LoginUseCase, ValidateUserUseCase, JwtStrategy],
  exports: [LoginUseCase, ValidateUserUseCase, JwtStrategy, JwtModule],
})
export class AuthModule {}
