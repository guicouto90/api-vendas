import { ICreateCustomer } from './../models/ICreateCustomer';
import { ICustomer } from '../models/ICustomer';

export interface ICustomerRepository {
  findByEmail(email: string): Promise<undefined | ICustomer>;
  findById(id: string): Promise<undefined | ICustomer>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  save(customer: ICustomer): Promise<ICustomer>;
  find(): Promise<ICustomer[]>;
  remove(customer: ICustomer): Promise<void>;
}
