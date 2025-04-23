import { Controller, Get, Query, BadRequestException, NotFoundException } from '@nestjs/common'
import { FindUsersUseCase } from '@/domain/user/application/use-cases/find-users.use-case'
import { EnumUserRole } from '@prisma/client'

@Controller('users')
export class FindUsersController {
  constructor(private findUsersUseCase: FindUsersUseCase) {}

  @Get()
  async handler(@Query('id') id?: string, @Query('name') name?: string, @Query('email') email?: string, @Query('role') role?: EnumUserRole) {
    try {
      const response = await this.findUsersUseCase.execute({ id, name, email, role })

      const { user, users } = response

      if (user) {
        return { user }
      }

      return { users }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message)
      }

      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message)
      }

      throw new BadRequestException('An error occurred while finding users.')
    }
  }
}
