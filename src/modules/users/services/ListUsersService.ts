import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UsersRepository } from './../typeorm/repositories/UserRepository';

export class ListUserService {
  async execute(): Promise<User[]> {
    const repository = getCustomRepository(UsersRepository);
    return repository.find();
  }
}
