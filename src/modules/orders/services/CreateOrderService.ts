import { IProduct } from '@modules/products/domain/model/IProduct';
import { IOrderRepository } from './../domain/repository/IOrderRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IOrder } from '../domain/model/IOrder';
import { ICustomerRepository } from '@modules/customers/domain/repository/ICustomerRepository';
import { IProductRepository } from '@modules/products/domain/repository/IProductRepository';

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
export class CreateOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
    @inject('ProductsRepository')
    private productRepository: IProductRepository,
    @inject('CustomersRepository')
    private curstomerRepository: ICustomerRepository,
  ) {}
  async execute(data: IRequest): Promise<IOrder> {
    const customerExists = await this.curstomerRepository.findById(data.customer_id);

    if (!customerExists) throw new AppError('Customer not found', 404);

    for (const product of data.products) {
      const productExists = await this.productRepository.findById(product.id);
      if (!productExists)
        throw new AppError(`Product with id: ${product.id} not found`, 404);

      if (product.quantity > productExists.quantity)
        throw new AppError(
          'Quantity required is less than available on inventory',
        );
      productExists.quantity = productExists.quantity - 1;

      this.productRepository.save(productExists);
    }
    const order = await this.orderRepository.createOrder({
      customer: customerExists,
      products: data.products,
    });

    return order;
  }
}
