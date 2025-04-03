import { Module } from "@nestjs/common"
import { DatabaseModule } from "../database/database.module"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { APP_GUARD, Reflector } from "@nestjs/core"
import { JwtAuthGuard } from "../auth/jwt-auth.guard"
import { JwtStrategy } from "../auth/jwt.strategy "
import { HeatlhCheckController } from "./controllers/health.controller"
import { CreateUserController } from "./controllers/user/create.user.controller"
import { FindUsersController } from "./controllers/user/find.users.controller"
import { UpdateUserController } from "./controllers/user/update.user.controller"
import { DeleteUserController } from "./controllers/user/delete.user.controller"
import { LoginController } from "./controllers/auth/login.controller"
import { MeController } from "./controllers/auth/me.controller"
import { CreateUserUseCase } from "@/domain/user/application/use-cases/create-user.use-case"
import { FindUsersUseCase } from "@/domain/user/application/use-cases/find-users.use-case"
import { UpdateUserUseCase } from "@/domain/user/application/use-cases/update-user.use-case"
import { DeleteUserUseCase } from "@/domain/user/application/use-cases/delete-user.use-case"
import { LoginUseCase } from "@/domain/auth/application/use-cases/login.use-case"

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || "your-secret-key",
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [
    HeatlhCheckController,
    CreateUserController,
    FindUsersController,
    UpdateUserController,
    DeleteUserController,
    LoginController,
    MeController,
  ],
  providers: [
    CreateUserUseCase,
    FindUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    LoginUseCase,
    JwtStrategy,
    Reflector,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class HttpModule {}

