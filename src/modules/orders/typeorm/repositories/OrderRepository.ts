import { Product } from '@modules/products/typeorm/entities/Product';
import { Customer } from './../../../customers/typeorm/entities/Customer';
import { Order } from '../entities/Order';
import { EntityRepository, Repository } from 'typeorm';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customer;
  products: IProduct[];
}

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async findById(id: string): Promise<undefined | Order> {
    return this.findOne({
      where: { id },
      relations: ['orders_products', 'customer'],
    });
  }

  async createOrder(data: IRequest): Promise<Order> {
    const order = this.create({
      customer: data.customer,
      orders_products: data.products,
    });

    await this.save(order);

    return order;
  }
}
