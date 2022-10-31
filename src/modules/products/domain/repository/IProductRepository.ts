import { ICreateProduct } from './../model/ICreateProduct';
import { IProduct } from '../model/IProduct';

export interface IProductRepository {
  findByName(name: string): Promise<null | IProduct>;
  findById(id: string): Promise<null | IProduct>;
  create(data: ICreateProduct): Promise<IProduct>;
  save(customer: IProduct): Promise<IProduct>;
  find(): Promise<IProduct[]>;
  remove(customer: IProduct): Promise<void>;
}
