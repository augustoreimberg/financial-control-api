import {
  Controller,
  Delete,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteUserUseCase } from '@/domain/user/application/use-cases/delete-user.use-case';

@ApiTags('Users')
@Controller('users')
export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  @Delete(':id')
  async handler(@Param('id') id: string) {
    try {
      const response = await this.deleteUserUseCase.execute({ id });

      if (response.success) {
        return { message: 'User successfully deleted' };
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }

      throw new BadRequestException(
        'An error occurred while deleting the user.',
      );
    }
  }
}
