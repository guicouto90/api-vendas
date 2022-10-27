import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { IProduct } from '@modules/products/domain/model/IProduct';

export interface ICreateOrder {
  customer: ICustomer;
  products: IProduct[];
}
