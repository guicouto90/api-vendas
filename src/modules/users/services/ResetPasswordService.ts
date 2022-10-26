import { UserTokensRepository } from './../typeorm/repositories/UserTokenRepository';
import { AppError } from './../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UserRepository';
import { addHours, isAfter } from 'date-fns';
import { cryptograph } from '@shared/utils/password.hash';

export class ResetPasswordService {
  async execute(token: string, password: string): Promise<void> {
    const tokenRepository = getCustomRepository(UserTokensRepository);
    const userRepository = getCustomRepository(UsersRepository);

    const userToken = await tokenRepository.findByToken(token);

    if (!userToken) throw new AppError('User Token not found', 404);

    const user = await userRepository.findOne({
      where: { id: userToken.user_id },
    });
    if (!user) throw new AppError('User not found', 404);

    const compareDate = addHours(userToken.created_at, 2);

    if (isAfter(Date.now(), compareDate))
      throw new AppError('Token expired', 401);

    user.password = cryptograph(password);

    await userRepository.save(user);
  }
}
