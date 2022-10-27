import { ICustomerRepository } from './../../../domain/repository/ICustomerRepository';
import { Customer } from '../entities/Customer';
import { getRepository, Repository } from 'typeorm';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';

export class CustomersRepository implements ICustomerRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  findById(id: string): Promise<ICustomer | undefined> {
    return this.ormRepository.findOne({
      where: { id },
    });
  }
  async findByEmail(email: string): Promise<undefined | ICustomer> {
    return this.ormRepository.findOne({
      where: { email },
    });
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
