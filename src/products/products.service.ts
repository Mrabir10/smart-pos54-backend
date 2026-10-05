import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAllProducts() {
    return this.productRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async getProductById(id: number) {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async createProduct(productData: {
    name: string;
    productCode: string;
    sellingPrice: number;
    purchasePrice: number;
    size?: string;
    stock?: number;
  }) {
    const product = this.productRepository.create(productData);

    return this.productRepository.save(product);
  }

  async updateProduct(
    id: number,
    productData: {
      name?: string;
      productCode?: string;
      sellingPrice?: number;
      purchasePrice?: number;
      size?: string;
      stock?: number;
    },
  ) {
    const product = await this.getProductById(id);

    Object.assign(product, productData);

    return this.productRepository.save(product);
  }

  async deleteProduct(id: number) {
    const product = await this.getProductById(id);

    await this.productRepository.remove(product);

    return {
      message: 'Product deleted successfully',
      id,
    };
  }
}