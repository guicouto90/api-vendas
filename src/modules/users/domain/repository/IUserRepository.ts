import { ICreateUser } from '../model/ICreateUser';
import { IUser } from '../model/IUser';

export interface IUserRepository {
  findByEmail(email: string): Promise<null | IUser>;
  findById(id: string): Promise<null | IUser>;
  create(data: ICreateUser): Promise<IUser>;
  save(customer: IUser): Promise<IUser>;
  find(): Promise<IUser[]>;
  remove(customer: IUser): Promise<void>;
}
