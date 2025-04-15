import { Controller, Get, Query, Param } from '@nestjs/common';
import { FindProductUseCase } from '@/domain/product/application/use-cases/find-product.use-case';

@Controller('products')
export class FindProductController {
  constructor(private findProductUseCase: FindProductUseCase) {}

  @Get()
  async handle(@Query('id') id?: string) {
    const { products } = await this.findProductUseCase.execute({ id });
    return products.map((product) => ({
      id: product.id.toString(),
      name: product.name,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));
  }

  @Get(':id')
  async handleById(@Param('id') id: string) {
    const { products } = await this.findProductUseCase.execute({ id });
    const product = products[0];
    return {
      id: product.id.toString(),
      name: product.name,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
