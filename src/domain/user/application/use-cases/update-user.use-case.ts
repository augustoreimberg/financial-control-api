import { Injectable, Inject, BadRequestException, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../repositories/user-repository";
import { EnumUserRole } from "@prisma/client";

interface UpdateUserUseCaseRequest {
  id: string;
  email?: string;
  password?: string;
  role?: EnumUserRole;
}

@Injectable()
export class UpdateUserUseCase {
    constructor( private userRepository: UserRepository) {}

  async execute({ id, email, password, role }: UpdateUserUseCaseRequest) {
    try {
      if (!id || typeof id !== "string") {
        throw new BadRequestException("Invalid user ID.");
      }

      const existingUser = await this.userRepository.findById(id);

      if (!existingUser) {
        throw new NotFoundException("User not found.");
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

      // Apenas atualiza os campos fornecidos
      const updateData: Partial<typeof existingUser> = {};

      if (email) updateData.email = email;
      if (password) updateData.password = password;
      if (role) updateData.role = role;

      await this.userRepository.update(id, updateData);

      // Buscar o usuário atualizado
      const updatedUser = await this.userRepository.findById(id);

      return { user: updatedUser };
    } catch (error) {
      console.error("Error in UpdateUserUseCase:", error);
      throw error;
    }
  }
}
