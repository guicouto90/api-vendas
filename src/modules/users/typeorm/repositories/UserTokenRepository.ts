import { EntityRepository, Repository } from 'typeorm';
import { UserTokens } from '../entities/UserTokens';

@EntityRepository(UserTokens)
export class UserTokensRepository extends Repository<UserTokens> {
  async findByToken(token: string): Promise<undefined | UserTokens> {
    return this.findOne({
      where: { token },
    });
  }

  async generateToken(userId: string): Promise<UserTokens> {
    const userToken = this.create({ user_id: userId });
    await this.save(userToken);

    return userToken;
  }
}
