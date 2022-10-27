import { Customer } from '@modules/customers/typeorm/entities/Customer';
import { CustomersRepository } from '@modules/customers/typeorm/repositories/CustomerRepository';
import { ProductsRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { OrderRepository } from '../typeorm/repositories/OrderRepository';
import { Order } from './../typeorm/entities/Order';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

export class CreateOrderService {
  async execute(data: IRequest): Promise<Order> {
    const orderRepository = getCustomRepository(OrderRepository);
    const customerRepository = getCustomRepository(CustomersRepository);
    const productRepository = getCustomRepository(ProductsRepository);

    const customerExists = await customerRepository.findOne({
      where: { id: data.customer_id },
    });

    if (!customerExists) throw new AppError('Customer not found', 404);

    for (const product of data.products) {
      const productExists = await productRepository.findOne({
        where: { id: product.product_id },
      });
      if (!productExists)
        throw new AppError(
          `Product with id: ${product.product_id} not found`,
          404,
        );
      if (product.quantity > productExists.quantity)
        throw new AppError(
          'Quantity required is less than available on inventory',
        );
      productExists.quantity = productExists.quantity - 1;

      productRepository.save(productExists);
    }
    const order = orderRepository.createOrder({
      customer: customerExists,
      products: data.products,
    });

    return order;
  }
}
