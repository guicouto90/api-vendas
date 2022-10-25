import { UpdateUserAvatarService } from './../services/UploadUserAvatarService';
import { CreateSessionsService } from './../services/CreateSessionsService';
import { ListUserService } from './../services/ListUsersService';
import { ListUserByIdService } from './../services/ListUserByIdService';
import { NextFunction, Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';

export class UserController {
  async list(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const service = new ListUserService();
    console.log(request.user);
    const users = await service.execute();

    return response.status(200).json(users);
  }

  async listById(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const service = new ListUserByIdService();
    const user = await service.execute(request.params.id);

    return response.status(200).json(user);
  }

  async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const service = new CreateUserService();
    const user = await service.execute(request.body);

    return response.status(201).json(user);
  }

  async login(
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
  }
}
