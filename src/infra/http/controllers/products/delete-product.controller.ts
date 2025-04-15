import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteProductUseCase } from '@/domain/product/application/use-cases/delete-product.use-case';

@Controller('products')
export class DeleteProductController {
  constructor(private deleteProductUseCase: DeleteProductUseCase) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.deleteProductUseCase.execute({ id });

    return {
      success: true,
    };
  }
}
