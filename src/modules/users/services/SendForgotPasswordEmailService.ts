import { UserTokensRepository } from './../typeorm/repositories/UserTokenRepository';
import { AppError } from './../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UserRepository';
import { EtherealMail } from '@config/mail/EtherealMail';
import { resolve } from 'path';

export class SendForgotPasswordEmailService {
  async execute(email: string): Promise<void> {
    const tokenRepository = getCustomRepository(UserTokensRepository);
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findByEmail(email);
    if (!user) throw new AppError('User not found', 404);
    const token = await tokenRepository.generateToken(user.id);

    const forgotPasswordTemplate = resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    const templateData = {
      file: forgotPasswordTemplate,
      variables: {
        name: user.name,
        link: `http://localhost:3000/reset_password?token=${token.token}`,
      },
    };
    await EtherealMail.sendMail(email, templateData);
  }
}
