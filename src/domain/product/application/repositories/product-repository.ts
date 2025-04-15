import { Product } from '../../enterprise/entities/product.entity';

export abstract class ProductRepository {
  abstract create(product: Product): Promise<void>;
  abstract findById(id: string): Promise<Product | null>;
  abstract findByName(name: string): Promise<Product | null>;
  abstract findAll(): Promise<Product[]>;
  abstract update(id: string, product: Product): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
