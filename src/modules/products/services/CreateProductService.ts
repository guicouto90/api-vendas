import { AppError } from './../../../shared/errors/AppError';
import { ProductsRepository } from './../typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import { Product } from '../typeorm/entities/Product';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export class CreateProductService {
  async execute(data: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const productExists = await productsRepository.findByName(data.name);
    if (productExists) throw new AppError('Product already exists');
    const product = productsRepository.create(data);
    await productsRepository.save(product);

    return product;
  }
}
