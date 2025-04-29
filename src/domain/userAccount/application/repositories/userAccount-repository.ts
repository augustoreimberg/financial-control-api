import { UserAccount } from "../../enterprise/entities/userAccount.entity";

export abstract class UserAccountRepository {
    abstract create(userAccount: UserAccount): Promise<void>;
}