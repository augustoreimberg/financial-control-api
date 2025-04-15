import { Controller, Post, Body } from '@nestjs/common';
import { CreateProductUseCase } from '@/domain/product/application/use-cases/create-product.use-case';

@Controller('products')
export class CreateProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  @Post()
  async handle(@Body() body: { name: string }) {
    const { product } = await this.createProductUseCase.execute(body);

    return {
      product: {
        id: product.id.toString(),
        name: product.name,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    };
  }
}
