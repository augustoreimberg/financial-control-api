import { Body, Controller, Post } from "@nestjs/common" 
import { CreateUserUseCase } from "@/domain/user/application/use-cases/create-user.use-case" 
import { EnumUserRole } from "@prisma/client"

interface CreateUserBody { 
  name?: string,
  email: string, 
  password?: string,
  role?: EnumUserRole 
}

@Controller("users") export class CreateUserController { 
  
  constructor(private createUserUseCase: CreateUserUseCase) {}

@Post() async create(@Body() body: CreateUserBody) { const { name, email, password, role } = body;

const result = await this.createUserUseCase.execute({
  name,
  email,
  password,
  role,
});

return result;
} }