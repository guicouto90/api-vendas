import { AppError } from './../../../shared/errors/AppError';
import { ICustomerRepository } from '../domain/repository/ICustomerRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class DeleteCustomerService {
  constructor(
    @inject('CustomerRepository')
    private repository: ICustomerRepository,
  ) {}
  async execute(id: string): Promise<void> {
    const customer = await this.repository.findById(id);
    if (!customer) throw new AppError('Customer not found', 404);

    await this.repository.remove(customer);
  }
}
