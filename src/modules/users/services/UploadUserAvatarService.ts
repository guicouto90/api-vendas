import { AppError } from './../../../shared/errors/AppError';
import { join } from 'path';
import { promises } from 'fs';
import uploadConfig from '@config/upload';
import { IUserRepository } from '../domain/repository/IUserRepository';
import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/model/IUser';

@injectable()
export class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository,
  ) {}
  async execute(email: string, avatarFileName: string): Promise<IUser> {
    const user = await this.repository.findByEmail(email);
    if (!user) throw new AppError('User not found', 404);

    if (user.avatar) {
      const userAvatarFilePath = join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) await promises.unlink(userAvatarFilePath);
    }

    user.avatar = avatarFileName;

    await this.repository.save(user);

    return user;
  }
}
