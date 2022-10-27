import { IUserToken } from './../model/IUserToken';

export interface IUserTokenRepository {
  findByToken(token: string): Promise<undefined | IUserToken>;
  generateToken(userId: string): Promise<IUserToken>;
}
