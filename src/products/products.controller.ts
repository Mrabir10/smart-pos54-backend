import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(Number(id));
  }

  @Post()
  createProduct(@Body() productData: {
    name: string;
    productCode: string;
    sellingPrice: number;
    purchasePrice: number;
    size?: string;
    stock?: number;
  }) {
    return this.productsService.createProduct(productData);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() productData: {
      name?: string;
      productCode?: string;
      sellingPrice?: number;
      purchasePrice?: number;
      size?: string;
      stock?: number;
    },
  ) {
    return this.productsService.updateProduct(
      Number(id),
      productData,
    );
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(Number(id));
  }
}