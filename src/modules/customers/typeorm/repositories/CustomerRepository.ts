import { Customer } from '../entities/Customer';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Customer)
export class CustomersRepository extends Repository<Customer> {
  async findByEmail(email: string): Promise<undefined | Customer> {
    return this.findOne({
      where: { email },
    });
  }
}
