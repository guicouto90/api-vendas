import { ListUserByIdService } from './../../../services/ListUserByIdService';
import { CreateUserService } from './../../../services/CreateUserService';
import { UpdateUserService } from './../../../services/UpdateUserService';
import { CreateSessionsService } from './../../../services/CreateSessionsService';
import { UpdateUserAvatarService } from './../../../services/UploadUserAvatarService';
import { ListUserService } from './../../../services/ListUsersService';
import { container } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';

export class UserController {
  async list(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const service = container.resolve(ListUserService);
    const users = await service.execute();

    return response.status(200).json(users);
  }

  async listById(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const service = container.resolve(ListUserByIdService);
    const user = await service.execute(request.params.id);

    return response.status(200).json(user);
  }

  async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const service = container.resolve(CreateUserService);
    const user = await service.execute(request.body);

    return response.status(201).json(user);
  }

  async updateUser(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const service = container.resolve(UpdateUserService);
    const user = await service.execute(request.user.id, request.body);

    return response.status(200).json(user);
  }

  async login(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const service = container.resolve(CreateSessionsService);
    const user = await service.execute(request.body);

    return response.status(200).json(user);
  }

  async uploadAvatar(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const service = container.resolve(UpdateUserAvatarService);
    const user = await service.execute(
      request.user.email,
      request.file?.filename as string,
    );

    return response.status(200).json(user);
  }
}
