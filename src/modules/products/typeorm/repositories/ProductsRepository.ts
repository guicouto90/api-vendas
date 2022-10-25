import { Product } from '@modules/products/typeorm/entities/Product';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  async findByName(name: string): Promise<undefined | Product> {
    return this.findOne({
      where: { name },
    });
  }
}
