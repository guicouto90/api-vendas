import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UsersRepository } from './../typeorm/repositories/UserRepository';

export class ListUserByIdService {
  async execute(id: string): Promise<User> {
    const repository = getCustomRepository(UsersRepository);
    const user = await repository.findOne({
      where: { id },
      select: ['id', 'email', 'name'],
    });
    if (!user) throw new AppError('User not found');
    return user;
  }
}
