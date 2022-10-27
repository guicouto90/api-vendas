import { IUserTokenRepository } from './../domain/repository/IUserTokenRepository';
import { AppError } from './../../../shared/errors/AppError';
import { EtherealMail } from '@config/mail/EtherealMail';
import { resolve } from 'path';
import { IUserRepository } from '../domain/repository/IUserRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UserTokenRepository')
    private tokenRepository: IUserTokenRepository,
  ) {}
  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new AppError('User not found', 404);
    const token = await this.tokenRepository.generateToken(user.id);

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
