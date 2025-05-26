import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user-repository';
import { EnumUserRole } from '@prisma/client';

interface FindUsersUseCaseRequest {
  id?: string;
  name?: string;
  email?: string;
  role?: EnumUserRole;
}

@Injectable()
export class FindUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ id, name, email, role }: FindUsersUseCaseRequest = {}) {
    try {
      if (id) {
        if (typeof id !== 'string') {
          throw new BadRequestException('Invalid user ID.');
        }

        const user = await this.userRepository.findById(id);

        if (!user) {
          throw new NotFoundException('User not found.');
        }

        return { user };
      }

      if (name) {
        if (typeof name !== 'string') {
          throw new BadRequestException('Invalid name format.');
        }

        const user = await this.userRepository.findByName(name);

        if (!user) {
          throw new NotFoundException('User not found.');
        }

        return { user };
      }
      if (email) {
        if (typeof email !== 'string' || !email.includes('@')) {
          throw new BadRequestException('Invalid email format.');
        }

        const user = await this.userRepository.findByEmail(email);

        if (!user) {
          throw new NotFoundException('User not found.');
        }

        return { user };
      }

      if (role) {
        if (!Object.values(EnumUserRole).includes(role)) {
          throw new BadRequestException('Invalid role.');
        }

        const users = await this.userRepository.findByRole(role);

        return { users };
      }

      const users = await this.userRepository.findAll();

      return { users };
    } catch (error) {
      console.error('Error in FindUsersUseCase:', error);
      throw error;
    }
  }
}
