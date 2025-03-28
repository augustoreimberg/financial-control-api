import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { HeatlhCheckController } from "./controllers/health.controller";
import { CreateUserController } from "./controllers/user/create.user.controller";
import { FindUsersController } from "./controllers/user/find.users.controller";
import { UpdateUserController } from "./controllers/user/update.user.controller";
import { DeleteUserController } from "./controllers/user/delete.user.controller";
import { CreateUserUseCase } from "@/domain/user/application/use-cases/create-user.use-case";
import { FindUsersUseCase } from "@/domain/user/application/use-cases/find-users.use-case";
import { UpdateUserUseCase } from "@/domain/user/application/use-cases/update-user.use-case";
import { DeleteUserUseCase } from "@/domain/user/application/use-cases/delete-user.use-case";


@Module({
  imports: [DatabaseModule],
  controllers: [ HeatlhCheckController, CreateUserController, FindUsersController, UpdateUserController, DeleteUserController ],
  providers: [ CreateUserUseCase, FindUsersUseCase, UpdateUserUseCase, DeleteUserUseCase ],
})
export class HttpModule {}
