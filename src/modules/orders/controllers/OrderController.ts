import { ListOrderByIdService } from './../services/ListOrderByIdService';
import { NextFunction, Request, Response } from 'express';
import { CreateOrderService } from '../services/CreateOrderService';

export class OrderController {
  async listById(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const service = new ListOrderByIdService();
    const order = await service.execute(request.params.id);

    return response.status(200).json(order);
  }

  async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const service = new CreateOrderService();
    const order = await service.execute(request.body);

    return response.status(201).json(order);
  }
}
