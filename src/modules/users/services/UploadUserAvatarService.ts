import { AppError } from './../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UserRepository';
import { join } from 'path';
import { promises } from 'fs';
import uploadConfig from '@config/upload';

export class UpdateUserAvatarService {
  async execute(email: string, avatarFileName: string): Promise<User> {
    const repository = getCustomRepository(UsersRepository);
    const user = await repository.findByEmail(email);
    if (!user) throw new AppError('User not found', 404);

    if (user.avatar) {
      const userAvatarFilePath = join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) await promises.unlink(userAvatarFilePath);
    }

    user.avatar = avatarFileName;

    repository.save(user);

    return user;
  }
}
