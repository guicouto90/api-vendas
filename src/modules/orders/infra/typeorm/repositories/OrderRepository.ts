import { ICreateOrder } from './../../../domain/model/ICreateOrder';
import { IOrderRepository } from './../../../domain/repository/IOrderRepository';
import { Order } from '../entities/Order';
import { Repository, getRepository } from 'typeorm';
import { dataSource } from '@shared/infra/typeorm';

export class OrderRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;
  constructor() {
    this.ormRepository = dataSource.getRepository(Order);
  }
  async findById(id: string): Promise<null | Order> {
    return this.ormRepository.findOne({
      where: { id },
      relations: ['orders_products', 'customer'],
    });
  }

  async createOrder(data: ICreateOrder): Promise<Order> {
    const order = this.ormRepository.create({
      customer: data.customer,
      orders_products: data.products,
    });

    await this.ormRepository.save(order);

    return order;
  }
}
