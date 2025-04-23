import { Injectable, BadRequestException } from "@nestjs/common";
import { UserRepository } from "../repositories/user-repository";
import { EnumUserRole } from "@prisma/client";
import { User } from "../../enterprise/entities/user.entity";

interface CreateUserUseCaseRequest {
  name?: string;
  email: string;
  password?: string;
  role?: EnumUserRole;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, email, password, role = EnumUserRole.VIEWER }: CreateUserUseCaseRequest) {
    try {
      if (name && typeof name !== "string") {
        throw new BadRequestException("Name must be a string.");
      }

      if (!email || typeof email !== "string" || !email.includes("@")) {
        throw new BadRequestException("Invalid email format.");
      }
  
      if (password && typeof password !== "string") {
        throw new BadRequestException("Password must be a string.");
      }
  
      if (role && !Object.values(EnumUserRole).includes(role)) {
        throw new BadRequestException("Invalid role.");
      }
  
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        throw new BadRequestException("Email already in use.");
      }
  
      const user = User.create({ name, email, password, role });
      await this.userRepository.create(user);
  
      return { user };
    } catch (error) {
      console.error("Error in CreateUserUseCase:", error);
      throw error;
    }
  }
  
}
