import { Injectable, Inject, BadRequestException, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../repositories/user-repository";
import { EnumUserRole } from "@prisma/client";

interface UpdateUserUseCaseRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  role?: EnumUserRole;
}

@Injectable()
export class UpdateUserUseCase {
    constructor( private userRepository: UserRepository) {}

  async execute({ id, name, email, password, role }: UpdateUserUseCaseRequest) {
    try {
      if (!id || typeof id !== "string") {
        throw new BadRequestException("Invalid user ID.");
      }

      const existingUser = await this.userRepository.findById(id);

      if (!existingUser) {
        throw new NotFoundException("User not found.");
      }

      if (name && typeof name !== "string") {
        throw new BadRequestException("Name must be a string.");
      }

      if (email && (typeof email !== "string" || !email.includes("@"))) {
        throw new BadRequestException("Invalid email format.");
      }

      if (password && typeof password !== "string") {
        throw new BadRequestException("Password must be a string.");
      }

      if (role && !Object.values(EnumUserRole).includes(role)) {
        throw new BadRequestException("Invalid role.");
      }

      const updateData: Partial<typeof existingUser> = {};

      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (password) updateData.password = password;
      if (role) updateData.role = role;

      await this.userRepository.update(id, updateData);

      const updatedUser = await this.userRepository.findById(id);

      return { user: updatedUser };
    } catch (error) {
      console.error("Error in UpdateUserUseCase:", error);
      throw error;
    }
  }
}
