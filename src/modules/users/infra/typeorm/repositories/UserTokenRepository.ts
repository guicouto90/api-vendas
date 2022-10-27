import { IUserTokenRepository } from './../../../domain/repository/IUserTokenRepository';
import { getRepository, Repository } from 'typeorm';
import { UserTokens } from '../entities/UserTokens';
import { IUserToken } from '@modules/users/domain/model/IUserToken';

export class UserTokensRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserTokens>;

  constructor() {
    this.ormRepository = getRepository(UserTokens);
  }
  async findByToken(token: string): Promise<undefined | IUserToken> {
    return this.ormRepository.findOne({
      where: { token },
    });
  }

  async generateToken(userId: string): Promise<IUserToken> {
    const userToken = this.ormRepository.create({ user_id: userId });
    await this.ormRepository.save(userToken);

    return userToken;
  }
}
