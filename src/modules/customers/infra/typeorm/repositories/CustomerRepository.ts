import { ICustomerRepository } from './../../../domain/repository/ICustomerRepository';
import { Customer } from '../entities/Customer';
import { Repository } from 'typeorm';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { dataSource } from '@shared/infra/typeorm';

export class CustomersRepository implements ICustomerRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Customer);
  }

  async findById(id: string): Promise<ICustomer | null> {
    return this.ormRepository.findOneBy({ id });
  }
  async findByEmail(email: string): Promise<null | ICustomer> {
    return this.ormRepository.findOneBy({ email });
  }

  async create(data: ICreateCustomer): Promise<ICustomer> {
    return this.ormRepository.create(data);
  }

  async save(customer: ICustomer): Promise<ICustomer> {
    return this.ormRepository.save(customer);
  }

  async find(): Promise<ICustomer[]> {
    return this.ormRepository.find();
  }

  async remove(customer: ICustomer): Promise<void> {
    await this.ormRepository.remove(customer);
  }
}
