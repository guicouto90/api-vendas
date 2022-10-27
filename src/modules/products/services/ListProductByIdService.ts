import { AppError } from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../domain/repository/IProductRepository';
import { IProduct } from '../domain/model/IProduct';

@injectable()
export class ListProductByIdService {
  constructor(
    @inject('ProductsRepository')
    private repository: IProductRepository,
  ) {}

  async execute(id: string): Promise<IProduct> {
    const product = await this.repository.findById(id);
    if (!product) throw new AppError('Product not found');
    return product;
  }
}
