import {
  Controller,
  Put,
  Param,
  Body,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserUseCase } from '@/domain/user/application/use-cases/update-user.use-case';
import { EnumUserRole } from '@prisma/client';

@ApiTags('Users')
@Controller('users')
export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  @Put(':id')
  async handler(
    @Param('id') id: string,
    @Body() body: { email?: string; password?: string; role?: EnumUserRole },
  ) {
    try {
      const { email, password, role } = body;

      const response = await this.updateUserUseCase.execute({
        id,
        email,
        password,
        role,
      });

      const { user } = response;

      return { user };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }

      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new BadRequestException(
        'An error occurred while updating the user.',
      );
    }
  }
}
