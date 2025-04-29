import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/optional";

interface UserAccountProps {
    userId: string;
    accountId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class UserAccount extends Entity<UserAccountProps> {
    get userId() {
        return this.props.userId;
    }
    set userId(userId: string) {
        this.props.userId = userId;
        this.touch();
    }
    get accountId() {
        return this.props.accountId;   
    }
    set accountId(accountId: string) {
        this.props.accountId = accountId;
        this.touch();
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    private touch() {
        this.props.updatedAt = new Date();
    }

    public static create(props: Optional<UserAccountProps, "createdAt">, 
        id?: UniqueEntityID) {
        const userAccount = new UserAccount(
            {
                ...props,
                createdAt: props.createdAt ?? new Date(),
            },
            id,
        )

        return userAccount
    }
}