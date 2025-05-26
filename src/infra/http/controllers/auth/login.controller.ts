import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from '@/domain/auth/application/use-cases/login.use-case';
import { Public } from '@/infra/auth/public';
import { ApiTags } from '@nestjs/swagger';

interface LoginBody {
  email: string;
  password: string;
}

@ApiTags('Auth')
@Controller('auth')
export class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}

  @Public()
  @Post('login')
  async login(@Body() body: LoginBody) {
    const { email, password } = body;

    const result = await this.loginUseCase.execute({
      email,
      password,
    });

    return result;
  }
}
