import { AppError } from '../../../shared/errors/AppError';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';

export class DeleteProductService {
  async execute(id: string): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findOne(id);
    if (!product) throw new AppError('Product not found');

    await productsRepository.remove(product);
  }
}
