import { User } from '../../enterprise/entities/user.entity';
import { EnumUserRole } from '@prisma/client';

export abstract class UserRepository {
  abstract create(data: User): Promise<void>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findByRole(role: EnumUserRole): Promise<User[]>;
  abstract findAll(): Promise<User[]>;
  abstract update(id: string, data: Partial<User>): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract isUserAssignedToClient(
    userId: string,
    clientId: string,
  ): Promise<boolean>;
  abstract findByClientId(clientId: string): Promise<User[]>;
}
