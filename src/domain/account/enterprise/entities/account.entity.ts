import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/optional';

interface AccountProps {
  name: String;
  email: String;
  sinacorCode: String;
  accountNumber: String;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export class Account extends Entity<AccountProps> {
  get name() {
    return this.props.name;
  }
  set name(name: String) {
    this.props.name = name;
    this.touch();
  }

  get email() {
    return this.props.email;
  }
  set email(email: String) {
    this.props.email = email;
    this.touch();
  }

  get sinacorCode() {
    return this.props.sinacorCode;
  }
  set sinacorCode(sinacorCode: String) {
    this.props.sinacorCode = sinacorCode;
    this.touch();
  }

  get accountNumber() {
    return this.props.accountNumber;
  }
  set accountNumber(accountNumber: String) {
    this.props.accountNumber = accountNumber;
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

  public static create(
    props: Optional<AccountProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const account = new Account(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return account;
  }
}
