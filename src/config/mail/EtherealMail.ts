import {
  HandlebarsMailTemplate,
  IParseMailTemplate,
} from './HandlebarsMailTemplate';
import nodemailer from 'nodemailer';

export class EtherealMail {
  static async sendMail(
    to: string,
    templateData: IParseMailTemplate,
  ): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    const message = await transporter.sendMail({
      from: 'teste@teste.com.br',
      to,
      subject: 'Recuperação de senha',
      html: await HandlebarsMailTemplate.parse(templateData),
    });
    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
