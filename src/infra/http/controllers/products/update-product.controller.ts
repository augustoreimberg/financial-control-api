import { Controller, Put, Body, Param } from '@nestjs/common';
import { UpdateProductUseCase } from '@/domain/product/application/use-cases/update-product.use-case';

@Controller('products')
export class UpdateProductController {
  constructor(private updateProductUseCase: UpdateProductUseCase) {}

  @Put(':id')
  async handle(@Param('id') id: string, @Body() body: { name?: string }) {
    const { product } = await this.updateProductUseCase.execute({
      id,
      ...body,
    });

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
