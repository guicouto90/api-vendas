import { IOrderRepository } from './../../modules/orders/domain/repository/IOrderRepository';
import { IUserTokenRepository } from './../../modules/users/domain/repository/IUserTokenRepository';
import { IUserRepository } from './../../modules/users/domain/repository/IUserRepository';
import { IProductRepository } from './../../modules/products/domain/repository/IProductRepository';
import { ICustomerRepository } from '@modules/customers/domain/repository/ICustomerRepository';
import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomerRepository';
import { container } from 'tsyringe';
import { ProductsRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UserRepository';
import { UserTokensRepository } from '@modules/users/infra/typeorm/repositories/UserTokenRepository';
import { OrderRepository } from '@modules/orders/infra/typeorm/repositories/OrderRepository';

container.registerSingleton<ICustomerRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<IProductRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UsersRepository);

container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokensRepository,
);

container.registerSingleton<IOrderRepository>(
  'OrderRepository',
  OrderRepository,
);
