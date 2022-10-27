import { IUserRepository } from './../domain/repository/IUserRepository';
import { AppError } from './../../../shared/errors/AppError';
import { cryptograph } from '@shared/utils/password.hash';
import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/model/IUser';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository,
  ) {}
  async execute(data: IRequest): Promise<IUser> {
    const userExists = await this.repository.findByEmail(data.email);
    if (userExists) throw new AppError('User already exist');
    const passwordHash = cryptograph(data.password);

    const user = await this.repository.create({
      name: data.name,
      email: data.email,
      password: passwordHash,
    });
    await this.repository.save(user);

    return user;
  }
}
