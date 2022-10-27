import { AppError } from '@shared/errors/AppError';
import { Customer } from '../infra/typeorm/entities/Customer';
import { inject, injectable } from 'tsyringe';
import { ICustomerRepository } from '../domain/repository/ICustomerRepository';

@injectable()
export class ListCustomerByIdService {
  constructor(
    @inject('CustomerRepository')
    private repository: ICustomerRepository,
  ) {}
  async execute(id: string): Promise<Customer> {
    const customer = await this.repository.findById(id);
    if (!customer) throw new AppError('Customer not found', 404);

    return customer;
  }
}
