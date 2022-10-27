import { ICreateCustomer } from './../domain/models/ICreateCustomer';
import { AppError } from './../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Customer } from '../infra/typeorm/entities/Customer';
import { CustomersRepository } from '../infra/typeorm/repositories/CustomerRepository';
import { inject, injectable } from 'tsyringe';
import { ICustomerRepository } from '../domain/repository/ICustomerRepository';

@injectable()
export class UpdateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private repository: ICustomerRepository,
  ) {}
  async execute(id: string, data: ICreateCustomer): Promise<Customer> {
    const repository = getCustomRepository(CustomersRepository);
    const customer = await this.repository.findById(id);

    if (!customer) throw new AppError('customer not found', 404);

    const customerUpdateEmail = await repository.findByEmail(data.email);

    if (customerUpdateEmail && customerUpdateEmail?.id !== customer.id)
      throw new AppError('Email already registered');

    customer.name = data.name;
    customer.email = data.email;

    await this.repository.save(customer);

    return customer;
  }
}
