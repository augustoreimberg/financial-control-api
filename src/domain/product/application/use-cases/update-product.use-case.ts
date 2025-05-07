import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from '../repositories/product-repository';

interface UpdateProductUseCaseRequest {
  id: string;
  name?: string;
}

@Injectable()
export class UpdateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  private validateRequest(request: UpdateProductUseCaseRequest) {
    if (!request.id) {
      throw new BadRequestException('ID do produto necessário');
    }
  }

  async execute(request: UpdateProductUseCaseRequest) {
    try {
      this.validateRequest(request);

      const product = await this.productRepository.findById(request.id);

      if (!product) {
        throw new NotFoundException('Produto não encontrado');
      }

      if (request.name) {
        const productWithSameName = await this.productRepository.findByName(
          request.name,
        );
        if (
          productWithSameName &&
          productWithSameName.id.toString() !== request.id
        ) {
          throw new BadRequestException('Já existe um produto com este nome');
        }
        product.name = request.name;
      }

      await this.productRepository.update(request.id, product);

      return { product };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      console.error('Error in UpdateProductUseCase:', error);
      throw new BadRequestException('Erro ao atualizar produto');
    }
  }
}
