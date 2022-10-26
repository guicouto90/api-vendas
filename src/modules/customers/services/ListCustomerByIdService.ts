import { AppError } from './../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Customer } from '../typeorm/entities/Customer';
import { CustomersRepository } from './../typeorm/repositories/CustomerRepository';

export class ListCustomerByIdService {
  async execute(id: string): Promise<Customer> {
    const repository = getCustomRepository(CustomersRepository);
    const customer = await repository.findOne({ where: { id } });
    if (!customer) throw new AppError('Customer not found', 404);

    return customer;
  }
}
