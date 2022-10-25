import { AppError } from './../../../shared/errors/AppError';
import { ProductsRepository } from './../typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import { Product } from '../typeorm/entities/Product';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export class UpdateProductService {
  async execute(id: string, data: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findOne(id);
    if (!product) throw new AppError('Product not found');

    const productExists = await productsRepository.findByName(data.name);
    if (productExists && data.name !== product.name)
      throw new AppError('Product already exists');

    product.name = data.name;
    product.quantity = data.quantity;
    product.price = data.price;

    await productsRepository.save(product);

    return product;
  }
}
