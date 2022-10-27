import { ICreateProduct } from './../domain/model/ICreateProduct';
import { IProductRepository } from './../domain/repository/IProductRepository';
import { AppError } from './../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IProduct } from '../domain/model/IProduct';

@injectable()
export class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private repository: IProductRepository,
  ) {}
  async execute(data: ICreateProduct): Promise<IProduct> {
    const productExists = await this.repository.findByName(data.name);
    if (productExists) throw new AppError('Product already exists');
    const product = await this.repository.create(data);
    await this.repository.save(product);

    return product;
  }
}
