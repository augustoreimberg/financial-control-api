import { Product } from '@/domain/product/enterprise/entities/product.entity';
import { Prisma, Product as PrismaProduct } from '@prisma/client';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export class PrismaProductMapper {
  static toDomain(raw: PrismaProduct): Product {
    return Product.create(
      {
        name: raw.name,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(product: Product): Prisma.ProductUncheckedCreateInput {
    return {
      id: product.id.toString(),
      name: product.name,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
