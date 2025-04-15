import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface ProductProps {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Product extends Entity<ProductProps> {
  get name() {
    return this.props.name;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set name(name: string) {
    this.props.name = name;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Omit<ProductProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID,
  ) {
    const product = new Product(
      {
        ...props,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      id,
    );

    return product;
  }
}
