import { AppError } from './../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UserRepository';
import { cryptograph } from '@shared/utils/password.hash';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  async execute(data: IRequest): Promise<User> {
    const repository = getCustomRepository(UsersRepository);
    const userExists = await repository.findByEmail(data.email);
    if (userExists) throw new AppError('User already exist');
    const passwordHash = cryptograph(data.password);
    const user = repository.create({
      name: data.name,
      email: data.email,
      password: passwordHash,
    });
    await repository.save(user);

    return user;
  }
}
