import { ResetPasswordService } from './../services/ResetPasswordService';
import { SendForgotPasswordEmailService } from '../services/SendForgotPasswordEmailService';
import { UpdateUserAvatarService } from '../services/UploadUserAvatarService';
import { CreateSessionsService } from '../services/CreateSessionsService';
import { ListUserService } from '../services/ListUsersService';
import { ListUserByIdService } from '../services/ListUserByIdService';
import { NextFunction, Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';

export class UserPasswordController {
  async createToken(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const service = new SendForgotPasswordEmailService();
    await service.execute(request.body.email);

    return response.status(204).json({});
  }

  async resetPassword(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const service = new ResetPasswordService();
    await service.execute(request.body.token, request.body.password);

    return response.status(204).json({});
  }

  /*async login(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const service = new CreateSessionsService();
    const user = await service.execute(request.body);

    return response.status(200).json(user);
  }

  async uploadAvatar(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const service = new UpdateUserAvatarService();
    const user = await service.execute(
      request.user.email,
      request.file?.filename as string,
    );

    return response.status(200).json(user);
  } */
}
