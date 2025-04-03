import { Injectable, BadRequestException, UnauthorizedException } from "@nestjs/common"
import { UserRepository } from "@/domain/user/application/repositories/user-repository";
import { JwtService } from "@nestjs/jwt"

interface LoginUseCaseRequest {
  email: string
  password: string
}

@Injectable()
export class LoginUseCase {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute({ email, password }: LoginUseCaseRequest) {
    try {
      if (!email || typeof email !== "string" || !email.includes("@")) {
        throw new BadRequestException("Invalid email format.")
      }

      if (!password || typeof password !== "string") {
        throw new BadRequestException("Password is required.")
      }

      const user = await this.userRepository.findByEmail(email)

      if (!user) {
        throw new UnauthorizedException("Invalid credentials.")
      }

      const isPasswordValid = password === user.password

      if (!isPasswordValid) {
        throw new UnauthorizedException("Invalid credentials.")
      }

      const payload = {
        sub: user.id.toString(),
        email: user.email,
        role: user.role,
      }

      const accessToken = this.jwtService.sign(payload)

      return {
        accessToken,
        user: {
          id: user.id.toString(),
          email: user.email,
          role: user.role,
        },
      }
    } catch (error) {
      console.error("Error in LoginUseCase:", error)
      throw error
    }
  }
}

