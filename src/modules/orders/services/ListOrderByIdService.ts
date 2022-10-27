import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { OrderRepository } from '../typeorm/repositories/OrderRepository';
import { Order } from './../typeorm/entities/Order';

export class ListOrderByIdService {
  async execute(id: string): Promise<Order> {
    const orderRepository = getCustomRepository(OrderRepository);

    const order = await orderRepository.findById(id);

    if (!order) throw new AppError('Order not found', 404);

    return order;
  }
}
