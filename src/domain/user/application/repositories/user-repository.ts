import { User } from "../../enterprise/entities/user.entity"


export abstract class UserRepository {
  abstract create(data: User): Promise<void>
}

