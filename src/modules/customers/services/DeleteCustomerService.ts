import { AppError } from './../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { CustomersRepository } from './../typeorm/repositories/CustomerRepository';

export class DeleteCustomerService {
  async execute(id: string): Promise<void> {
    const repository = getCustomRepository(CustomersRepository);
    const customer = await repository.findOne({ where: { id } });
    if (!customer) throw new AppError('Customer not found', 404);

    await repository.remove(customer);
  }
}
