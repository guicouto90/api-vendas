import { ListProductByIdService } from './../../../services/ListProductByIdService';
import { NextFunction, Request, Response } from 'express';
import { CreateCustomerService } from '@modules/customers/services/CreateCustomerService';
import { UpdateCustomerService } from './../../../../customers/services/UpdateCustomerService';
import { DeleteCustomerService } from './../../../../customers/services/DeleteCustomerService';
import { ListProductsService } from '@modules/products/services/ListProductsService';
import { container } from 'tsyringe';

export class ProductsController {
  async list(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const service = container.resolve(ListProductsService);
    const products = await service.execute();

    return response.status(200).json(products);
  }

  async listById(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const service = container.resolve(ListProductByIdService);
    const product = await service.execute(request.params.id);

    return response.status(200).json(product);
  }

  async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const service = container.resolve(CreateCustomerService);
    const products = await service.execute(request.body);

    return response.status(201).json(products);
  }

  async update(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const service = container.resolve(UpdateCustomerService);
    const product = await service.execute(request.params.id, request.body);

    return response.status(200).json(product);
  }

  async delete(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const service = container.resolve(DeleteCustomerService);
    await service.execute(request.params.id);

    return response.status(204).json({});
  }
}
