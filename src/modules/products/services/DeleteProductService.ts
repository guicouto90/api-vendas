import { AppError } from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../domain/repository/IProductRepository';

@injectable()
export class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private repository: IProductRepository,
  ) {}
  async execute(id: string): Promise<void> {
    const product = await this.repository.findById(id);
    if (!product) throw new AppError('Product not found');

    await this.repository.remove(product);
  }
}
