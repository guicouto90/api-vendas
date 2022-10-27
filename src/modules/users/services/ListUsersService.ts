import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/model/IUser';
import { IUserRepository } from '../domain/repository/IUserRepository';

@injectable()
export class ListUserService {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository,
  ) {}
  async execute(): Promise<IUser[]> {
    return this.repository.find();
  }
}
