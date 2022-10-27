import { IProduct } from '../domain/model/IProduct';
import { IProductRepository } from '../domain/repository/IProductRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private repository: IProductRepository,
  ) {}
  async execute(): Promise<IProduct[]> {
    const products = await this.repository.find();
    return products;
  }
}
