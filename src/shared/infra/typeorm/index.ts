import { Customer } from '../../../modules/customers/infra/typeorm/entities/Customer';
import { Order } from '../../../modules/orders/infra/typeorm/entities/Order';
import { OrdersProducts } from '../../../modules/orders/infra/typeorm/entities/OrdersProducts';
import { Product } from '../../../modules/products/infra/typeorm/entities/Product';
import { User } from '../../../modules/users/infra/typeorm/entities/User';
import { UserTokens } from '../../../modules//users/infra/typeorm/entities/UserTokens';
import { DataSource } from 'typeorm';
import { CreateProducts1666695941406 } from './migrations/1666695941406-CreateProducts';
import { CreateUsers1666709917406 } from './migrations/1666709917406-CreateUsers';
import { CreateUsersToken1666731078069 } from './migrations/1666731078069-CreateUsersToken';
import { CreateCustomers1666806086861 } from './migrations/1666806086861-CreateCustomers';
import { CreateOrders1666811496150 } from './migrations/1666811496150-CreateOrders';
import { AddCustomerIdToOrders1666811655283 } from './migrations/1666811655283-AddCustomerIdToOrders';
import { CreateOrdersProducts1666812135440 } from './migrations/1666812135440-CreateOrdersProducts';
import { AddOrderIdToOrdersProducts1666812262655 } from './migrations/1666812262655-AddOrderIdToOrdersProducts';
import { AddProductIdToOrdersProducts1666812482468 } from './migrations/1666812482468-AddProductIdToOrdersProducts';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  entities: [User, UserTokens, Customer, Order, OrdersProducts, Product],
  migrations: [
    CreateProducts1666695941406,
    CreateUsers1666709917406,
    CreateUsersToken1666731078069,
    CreateCustomers1666806086861,
    CreateOrders1666811496150,
    AddCustomerIdToOrders1666811655283,
    CreateOrdersProducts1666812135440,
    AddOrderIdToOrdersProducts1666812262655,
    AddProductIdToOrdersProducts1666812482468,
  ],
});
