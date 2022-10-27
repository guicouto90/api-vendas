import { AppError } from './../../../shared/errors/AppError';
import { addHours, isAfter } from 'date-fns';
import { cryptograph } from '@shared/utils/password.hash';
import { IUserTokenRepository } from '../domain/repository/IUserTokenRepository';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repository/IUserRepository';

@injectable()
export class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UserTokenRepository')
    private tokenRepository: IUserTokenRepository,
  ) {}
  async execute(token: string, password: string): Promise<void> {
    const userToken = await this.tokenRepository.findByToken(token);

    if (!userToken) throw new AppError('User Token not found', 404);

    const user = await this.userRepository.findById(userToken.user_id);
    if (!user) throw new AppError('User not found', 404);

    const compareDate = addHours(userToken.created_at, 2);

    if (isAfter(Date.now(), compareDate))
      throw new AppError('Token expired', 401);

    user.password = cryptograph(password);

    await this.userRepository.save(user);
  }
}
