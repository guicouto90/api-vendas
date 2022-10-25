import { AppError } from '../../../shared/errors/AppError';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import { Product } from '../typeorm/entities/Product';

export class ListProductByIdService {
  async execute(id: string): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const product = await productsRepository.findOne(id);
    if (!product) throw new AppError('Product not found');
    return product;
  }
}
