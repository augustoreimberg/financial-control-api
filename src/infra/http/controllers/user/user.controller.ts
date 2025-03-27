import { Body, Controller, Post } from "@nestjs/common"
import { CreateUserUseCase } from "@/domain/user/application/use-cases/create-user.use-case"
import { EnumUserRole } from "@prisma/client"

interface CreateUserBody {
  email: string
  password?: string
  role?: EnumUserRole
}

@Controller("users")
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(@Body() body: CreateUserBody) {
    const { email, password, role } = body;

    const result = await this.createUserUseCase.execute({
      email,
      password,
      role,
    });

    return result;
  }
}

