import { ICreateProduct } from './../domain/model/ICreateProduct';
import { AppError } from './../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../domain/repository/IProductRepository';
import { IProduct } from '../domain/model/IProduct';

@injectable()
export class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private repository: IProductRepository,
  ) {}
  async execute(id: string, data: ICreateProduct): Promise<IProduct> {
    const product = await this.repository.findById(id);
    if (!product) throw new AppError('Product not found');

    const productExists = await this.repository.findByName(data.name);
    if (productExists && data.name !== product.name)
      throw new AppError('Product already exists');

    product.name = data.name;
    product.quantity = data.quantity;
    product.price = data.price;

    await this.repository.save(product);

    return product;
  }
}
