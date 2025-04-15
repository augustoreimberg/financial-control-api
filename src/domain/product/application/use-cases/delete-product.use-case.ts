import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from '../repositories/product-repository';

interface DeleteProductUseCaseRequest {
  id: string;
}

@Injectable()
export class DeleteProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  private validateRequest(request: DeleteProductUseCaseRequest) {
    if (!request.id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('ID do produto inválido');
    }
  }

  async execute(request: DeleteProductUseCaseRequest) {
    try {
      this.validateRequest(request);

      const product = await this.productRepository.findById(request.id);

      if (!product) {
        throw new NotFoundException('Produto não encontrado');
      }

      await this.productRepository.delete(request.id);

      return { success: true };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      console.error('Error in DeleteProductUseCase:', error);
      throw new BadRequestException('Erro ao deletar produto');
    }
  }
}
