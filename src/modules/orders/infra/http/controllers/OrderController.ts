import { CreateOrderService } from './../../../services/CreateOrderService';
import { container } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';
import { ListOrderByIdService } from '@modules/orders/services/ListOrderByIdService';

export class OrderController {
  async listById(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const service = container.resolve(ListOrderByIdService);
    const order = await service.execute(request.params.id);

    return response.status(200).json(order);
  }

  async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const service = container.resolve(CreateOrderService);
    const order = await service.execute(request.body);

    return response.status(201).json(order);
  }
}
