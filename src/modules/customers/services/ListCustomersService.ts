import { ICustomerRepository } from './../domain/repository/ICustomerRepository';
import { inject, injectable } from 'tsyringe';
import { Customer } from '../infra/typeorm/entities/Customer';

@injectable()
export class ListCustomersService {
  constructor(
    @inject('CustomerRepository')
    private repository: ICustomerRepository,
  ) {}
  async execute(): Promise<Customer[]> {
    return this.repository.find();
  }
}
