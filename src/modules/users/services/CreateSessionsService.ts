import { generateToken } from './../utils/auth';
import { AppError } from './../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UserRepository';
import { cryptograph } from '@shared/utils/password.hash';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export class CreateSessionsService {
  async execute(data: IRequest): Promise<IResponse> {
    const repository = getCustomRepository(UsersRepository);

    const user = await repository.findByEmail(data.email);

    const passwordHash = cryptograph(data.password);

    if (user?.password !== passwordHash || !user)
      throw new AppError('Email or password incorrect', 401);

    const token = generateToken(data.email);

    return { user, token };
  }
}
