import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/model/IUser';
import { IUserRepository } from '../domain/repository/IUserRepository';

@injectable()
export class ListUserByIdService {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository,
  ) {}

  async execute(id: string): Promise<IUser> {
    const user = await this.repository.findById(id);
    if (!user) throw new AppError('User not found');
    return user;
  }
}
