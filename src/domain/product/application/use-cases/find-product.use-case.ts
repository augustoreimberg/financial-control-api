import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from '../repositories/product-repository';
import { Product } from '../../enterprise/entities/product.entity';

interface FindProductUseCaseRequest {
  id?: string;
}

interface FindProductUseCaseResponse {
  products: Product[];
}

@Injectable()
export class FindProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  private validateRequest(request: FindProductUseCaseRequest) {
    if (request.id && !this.isValidUUID(request.id)) {
      throw new BadRequestException('ID do produto inválido');
    }
  }

  private isValidUUID(id: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  }

  async execute(
    request: FindProductUseCaseRequest,
  ): Promise<FindProductUseCaseResponse> {
    try {
      this.validateRequest(request);

      let products: Product[];

      if (request.id) {
        const product = await this.productRepository.findById(request.id);
        if (!product) {
          throw new NotFoundException('Produto não encontrado');
        }
        products = [product];
      } else {
        products = await this.productRepository.findAll();
      }

      return { products };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      console.error('Error in FindProductUseCase:', error);
      throw new BadRequestException('Erro ao buscar produto(s)');
    }
  }
}
