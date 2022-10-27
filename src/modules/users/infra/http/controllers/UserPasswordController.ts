import { ResetPasswordService } from './../../../services/ResetPasswordService';
import { SendForgotPasswordEmailService } from '@modules/users/services/SendForgotPasswordEmailService';
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

export class UserPasswordController {
  async createToken(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const service = container.resolve(SendForgotPasswordEmailService);
    await service.execute(request.body.email);

    return response.status(204).json({});
  }

  async resetPassword(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const service = container.resolve(ResetPasswordService);
    await service.execute(request.body.token, request.body.password);

    return response.status(204).json({});
  }
}
