import { getCustomRepository } from 'typeorm';
import { Customer } from '../typeorm/entities/Customer';
import { CustomersRepository } from './../typeorm/repositories/CustomerRepository';

export class ListCustomersService {
  async execute(): Promise<Customer[]> {
    const repository = getCustomRepository(CustomersRepository);
    return repository.find();
  }
}
