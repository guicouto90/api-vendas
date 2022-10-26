import { AppError } from '../../../shared/errors/AppError';
import { CustomersRepository } from '../typeorm/repositories/CustomerRepository';
import { Customer } from '../typeorm/entities/Customer';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  name: string;
  email: string;
}

export class CreateCustomerService {
  async execute(data: IRequest): Promise<Customer> {
    const repository = getCustomRepository(CustomersRepository);
    const customerExists = await repository.findByEmail(data.email);
    if (customerExists) throw new AppError('email already registered');

    const customer = repository.create(data);

    await repository.save(customer);

    return customer;
  }
}
