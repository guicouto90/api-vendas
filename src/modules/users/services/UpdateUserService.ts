import { AppError } from './../../../shared/errors/AppError';
import { cryptograph } from '@shared/utils/password.hash';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repository/IUserRepository';
import { IUser } from '../domain/model/IUser';

interface IRequest {
  name: string;
  email: string;
  newPassword?: string;
  password?: string;
}

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository,
  ) {}

  async execute(id: string, data: IRequest): Promise<IUser> {
    const user = await this.repository.findById(id);

    if (!user) throw new AppError('User not found', 404);

    const userUpdateEmail = await this.repository.findByEmail(data.email);

    if (userUpdateEmail && userUpdateEmail?.id !== user.id)
      throw new AppError('Email already registered');

    if (data.newPassword && !data.password)
      throw new AppError('Missing current password');

    if (data.newPassword && data.password) {
      const hashNewPassword = cryptograph(data.newPassword);
      const hashPassword = cryptograph(data.password);

      if (hashPassword !== user.password)
        throw new AppError('Password incorrect', 401);

      user.password = hashNewPassword;
    }

    user.name = data.name;
    user.email = data.email;

    this.repository.save(user);

    return user;
  }
}
