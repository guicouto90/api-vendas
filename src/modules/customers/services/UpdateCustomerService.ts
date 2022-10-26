import { AppError } from './../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Customer } from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomerRepository';
import { cryptograph } from '@shared/utils/password.hash';

interface IRequest {
  name: string;
  email: string;
}

export class UpdateCustomerService {
  async execute(id: string, data: IRequest): Promise<Customer> {
    const repository = getCustomRepository(CustomersRepository);
    const customer = await repository.findOne({ where: { id } });

    if (!customer) throw new AppError('customer not found', 404);

    const customerUpdateEmail = await repository.findByEmail(data.email);

    if (customerUpdateEmail && customerUpdateEmail?.id !== customer.id)
      throw new AppError('Email already registered');

    customer.name = data.name;
    customer.email = data.email;

    repository.save(customer);

    return customer;
  }
}
