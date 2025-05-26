import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/optional';

interface AccountProps {
  name: string;
  email: string;
  sinacorCode: string;
  accountNumber: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  users?: any[];
}

export class Account extends Entity<AccountProps> {
  get name() {
    return this.props.name;
  }
  set name(name: string) {
    this.props.name = name;
    this.touch();
  }

  get email() {
    return this.props.email;
  }
  set email(email: string) {
    this.props.email = email;
    this.touch();
  }

  get sinacorCode() {
    return this.props.sinacorCode;
  }
  set sinacorCode(sinacorCode: string) {
    this.props.sinacorCode = sinacorCode;
    this.touch();
  }

  get accountNumber() {
    return this.props.accountNumber;
  }
  set accountNumber(accountNumber: string) {
    this.props.accountNumber = accountNumber;
    this.touch();
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get deletedAt() {
    return this.props.deletedAt;
  }

  get users() {
    return this.props.users;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  public static create(
    props: Optional<
      AccountProps,
      'createdAt' | 'updatedAt' | 'deletedAt' | 'users'
    >,
    id?: UniqueEntityID,
  ) {
    const account = new Account(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
        deletedAt: props.deletedAt ?? null,
        users: props.users ?? [],
      },
      id,
    );

    return account;
  }
}
