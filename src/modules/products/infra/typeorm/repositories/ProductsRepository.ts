import { IProductRepository } from './../../../domain/repository/IProductRepository';
import { Repository, getRepository } from 'typeorm';
import { Product } from '../entities/Product';
import { ICreateProduct } from '@modules/products/domain/model/ICreateProduct';
import { IProduct } from '@modules/products/domain/model/IProduct';

export class ProductsRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  findById(id: string): Promise<IProduct | undefined> {
    return this.ormRepository.findOne({
      where: { id },
    });
  }

  async findByName(name: string): Promise<undefined | IProduct> {
    return this.ormRepository.findOne({
      where: { name },
    });
  }

  async create(data: ICreateProduct): Promise<IProduct> {
    return this.ormRepository.create(data);
  }

  async save(customer: IProduct): Promise<IProduct> {
    return this.ormRepository.save(customer);
  }

  async find(): Promise<IProduct[]> {
    return this.ormRepository.find();
  }

  async remove(customer: IProduct): Promise<void> {
    await this.ormRepository.remove(customer);
  }
}
