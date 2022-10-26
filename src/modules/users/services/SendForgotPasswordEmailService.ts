import { UserTokensRepository } from './../typeorm/repositories/UserTokenRepository';
import { AppError } from './../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UserRepository';

export class SendForgotPasswordEmailService {
  async execute(email: string): Promise<void> {
    const tokenRepository = getCustomRepository(UserTokensRepository);
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findByEmail(email);
    if (!user) throw new AppError('User not found', 404);

    console.log(user);

    const token = await tokenRepository.generateToken(user.id);

    console.log(token);
  }
}
