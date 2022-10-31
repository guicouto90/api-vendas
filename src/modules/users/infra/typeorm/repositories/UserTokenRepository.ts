import { IUserTokenRepository } from './../../../domain/repository/IUserTokenRepository';
import { Repository } from 'typeorm';
import { UserTokens } from '../entities/UserTokens';
import { IUserToken } from '@modules/users/domain/model/IUserToken';
import { dataSource } from '@shared/infra/typeorm';

export class UserTokensRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserTokens>;

  constructor() {
    this.ormRepository = dataSource.getRepository(UserTokens);
  }
  async findByToken(token: string): Promise<null | IUserToken> {
    return this.ormRepository.findOneBy({ token });
  }

  async generateToken(userId: string): Promise<IUserToken> {
    const userToken = this.ormRepository.create({ user_id: userId });
    await this.ormRepository.save(userToken);

    return userToken;
  }
}
