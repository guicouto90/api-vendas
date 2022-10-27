import { generateToken } from './../utils/auth';
import { AppError } from './../../../shared/errors/AppError';
import { cryptograph } from '@shared/utils/password.hash';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repository/IUserRepository';
import { IUser } from '../domain/model/IUser';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: IUser;
  token: string;
}

@injectable()
export class CreateSessionsService {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository,
  ) {}

  async execute(data: IRequest): Promise<IResponse> {
    const user = await this.repository.findByEmail(data.email);

    const passwordHash = cryptograph(data.password);

    if (user?.password !== passwordHash || !user)
      throw new AppError('Email or password incorrect', 401);

    const token = generateToken(data.email, user.id);

    return { user, token };
  }
}
