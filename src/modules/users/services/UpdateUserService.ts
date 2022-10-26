import { AppError } from './../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UserRepository';
import { cryptograph } from '@shared/utils/password.hash';

interface IRequest {
  name: string;
  email: string;
  newPassword?: string;
  password?: string;
}

export class UpdateUserService {
  async execute(id: string, data: IRequest): Promise<User> {
    const repository = getCustomRepository(UsersRepository);
    const user = await repository.findOne({ where: { id } });

    if (!user) throw new AppError('User not found', 404);

    const userUpdateEmail = await repository.findByEmail(data.email);

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

    repository.save(user);

    return user;
  }
}
