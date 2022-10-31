import { IUserToken } from './../model/IUserToken';

export interface IUserTokenRepository {
  findByToken(token: string): Promise<null | IUserToken>;
  generateToken(userId: string): Promise<IUserToken>;
}
