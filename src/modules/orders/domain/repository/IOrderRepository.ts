import { ICreateOrder } from '../model/ICreateOrder';
import { IOrder } from '../model/IOrder';

export interface IOrderRepository {
  findById(id: string): Promise<null | IOrder>;
  createOrder(data: ICreateOrder): Promise<IOrder>;
}
