import { ProductsRepository } from './../typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import { Product } from '../typeorm/entities/Product';

export class ListProductsService {
  async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const products = await productsRepository.find();
    return products;
  }
}
