import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProductRepository } from '@/domain/product/application/repositories/product-repository';
import { Product } from '@/domain/product/enterprise/entities/product.entity';
import { PrismaProductMapper } from '../mappers/prisma-product.mapper';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private prisma: PrismaService) {}

  async create(product: Product): Promise<void> {
    const data = PrismaProductMapper.toPrisma(product);

    await this.prisma.product.create({
      data,
    });
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return null;
    }

    return PrismaProductMapper.toDomain(product);
  }

  async findByName(name: string): Promise<Product | null> {
    const product = await this.prisma.product.findFirst({
      where: { name },
    });

    if (!product) {
      return null;
    }

    return PrismaProductMapper.toDomain(product);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      orderBy: { name: 'asc' },
    });

    return products.map(PrismaProductMapper.toDomain);
  }

  async update(id: string, product: Product): Promise<void> {
    const data = PrismaProductMapper.toPrisma(product);

    await this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: { id },
    });
  }
}
