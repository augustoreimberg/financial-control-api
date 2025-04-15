import { Injectable, BadRequestException } from '@nestjs/common';
import { ProductRepository } from '../repositories/product-repository';
import { Product } from '../../enterprise/entities/product.entity';

interface CreateProductUseCaseRequest {
  name: string;
}

@Injectable()
export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  private validateRequest(request: CreateProductUseCaseRequest) {
    if (!request.name) {
      throw new BadRequestException('Nome do produto é obrigatório');
    }
  }

  async execute(request: CreateProductUseCaseRequest) {
    try {
      this.validateRequest(request);

      const productWithSameName = await this.productRepository.findByName(
        request.name,
      );

      if (productWithSameName) {
        throw new BadRequestException('Já existe um produto com este nome');
      }

      const product = Product.create({
        name: request.name,
      });

      await this.productRepository.create(product);

      return { product };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error('Error in CreateProductUseCase:', error);
      throw new BadRequestException('Erro ao criar produto');
    }
  }
}
