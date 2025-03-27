import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { HeatlhCheckController } from "./controllers/health.controller";
import { UserController } from "./controllers/user/user.controller";
import { CreateUserUseCase } from "@/domain/user/application/use-cases/create-user.use-case";

@Module({
  imports: [DatabaseModule],
  controllers: [ UserController, HeatlhCheckController],
  providers: [ CreateUserUseCase],
})
export class HttpModule {}
