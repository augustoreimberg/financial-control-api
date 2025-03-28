import { Injectable, Inject, BadRequestException, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../repositories/user-repository";

interface DeleteUserUseCaseRequest {
  id: string;
}

@Injectable()
export class DeleteUserUseCase {
  constructor( private userRepository: UserRepository) {}

  async execute({ id }: DeleteUserUseCaseRequest) {
    try {
      if (!id || typeof id !== "string") {
        throw new BadRequestException("Invalid user ID.");
      }

      const existingUser = await this.userRepository.findById(id);

      if (!existingUser) {
        throw new NotFoundException("User not found.");
      }

      await this.userRepository.delete(id);

      return { success: true };
    } catch (error) {
      console.error("Error in DeleteUserUseCase:", error);
      throw error;
    }
  }
}
