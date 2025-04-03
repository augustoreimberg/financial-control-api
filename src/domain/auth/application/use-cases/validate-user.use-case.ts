import { Injectable, UnauthorizedException } from "@nestjs/common"
import { UserRepository } from "@/domain/user/application/repositories/user-repository"
import { User } from "@/domain/user/enterprise/entities/user.entity"

interface ValidateUserUseCaseRequest {
  userId: string
}

@Injectable()
export class ValidateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ userId }: ValidateUserUseCaseRequest): Promise<User> {
    try {
      const user = await this.userRepository.findById(userId)

      if (!user) {
        throw new UnauthorizedException("User not found.")
      }

      return user
    } catch (error) {
      console.error("Error in ValidateUserUseCase:", error)
      throw error
    }
  }
}

