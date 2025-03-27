import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user-repository";
import { EnumUserRole } from "@prisma/client";
import { User } from "../../enterprise/entities/user.entity";

interface CreateUserUseCaseRequest {
  email: string;
  password?: string;
  role?: EnumUserRole;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password, role = EnumUserRole.VIEWER }: CreateUserUseCaseRequest) {
    const user = User.create({ email, password, role });

    await this.userRepository.create(user);

    return { user };
  }
}
