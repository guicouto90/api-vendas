import { User } from './../entities/User';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async findByEmail(email: string): Promise<undefined | User> {
    return this.findOne({
      where: { email },
    });
  }
}
