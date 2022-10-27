import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IOrder } from '../domain/model/IOrder';
import { IOrderRepository } from '../domain/repository/IOrderRepository';

@injectable()
export class ListOrderByIdService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}
  async execute(id: string): Promise<IOrder> {
    const order = await this.orderRepository.findById(id);

    if (!order) throw new AppError('Order not found', 404);

    return order;
  }
}
