import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateProductUseCase } from '@/domain/product/application/use-cases/create-product.use-case';
import { FindProductUseCase } from '@/domain/product/application/use-cases/find-product.use-case';
import { UpdateProductUseCase } from '@/domain/product/application/use-cases/update-product.use-case';
import { DeleteProductUseCase } from '@/domain/product/application/use-cases/delete-product.use-case';
import { Product } from '@/domain/product/enterprise/entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(
    private createProductUseCase: CreateProductUseCase,
    private findProductUseCase: FindProductUseCase,
    private updateProductUseCase: UpdateProductUseCase,
    private deleteProductUseCase: DeleteProductUseCase,
  ) {}

  @Post()
  async create(@Body() body: { name: string }) {
    const { product } = await this.createProductUseCase.execute(body);
    return product;
  }

  @Get()
  async find(@Query('id') id?: string) {
    const { products } = await this.findProductUseCase.execute({ id });
    return products;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: { name: string }) {
    const { product } = await this.updateProductUseCase.execute({
      id,
      name: body.name,
    });
    return product;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteProductUseCase.execute({ id });
    return { message: 'Produto deletado com sucesso' };
  }
}
