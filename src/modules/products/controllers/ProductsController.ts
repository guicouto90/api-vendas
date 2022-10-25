import { CreateProductService } from './../services/CreateProductService';
import { ListProductsService } from './../services/ListProductsService';
import { Request, Response, NextFunction } from 'express';
import { ListProductByIdService } from '../services/ListProductByIdService';
import { UpdateProductService } from '../services/UpdateProductService';
import { DeleteProductService } from '../services/DeleteProductService';

export class ProductsController {
  async list(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const service = new ListProductsService();
    const products = await service.execute();

    return response.status(200).json(products);
  }

  async listById(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const service = new ListProductByIdService();
    const product = await service.execute(request.params.id);

    return response.status(200).json(product);
  }

  async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const service = new CreateProductService();
    const products = await service.execute(request.body);

    return response.status(201).json(products);
  }

  async update(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const service = new UpdateProductService();
    const product = await service.execute(request.params.id, request.body);

    return response.status(200).json(product);
  }

  async delete(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const service = new DeleteProductService();
    await service.execute(request.params.id);

    return response.status(204).json({});
  }
}
