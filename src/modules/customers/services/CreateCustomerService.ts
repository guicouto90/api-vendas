import 'reflect-metadata';
import { ICreateCustomer } from './../domain/models/ICreateCustomer';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICustomerRepository } from './../domain/repository/ICustomerRepository';
import { AppError } from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private repository: ICustomerRepository,
  ) {}

  async execute(data: ICreateCustomer): Promise<ICustomer> {
    const customerExists = await this.repository.findByEmail(data.email);
    if (customerExists) throw new AppError('email already registered');

    const customer = await this.repository.create(data);

    await this.repository.save(customer);

    return customer;
  }
}
