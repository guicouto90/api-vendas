import { CreateCustomerService } from '../services/CreateCustomerService';
import { ListCustomersService } from '../services/ListCustomersService';
import { Request, Response, NextFunction } from 'express';
import { UpdateCustomerService } from '../services/UpdateCustomerService';
import { DeleteCustomerService } from '../services/DeleteCustomerService';
import { ListCustomerByIdService } from '../services/ListCustomerByIdService';

export class CustomersController {
  async list(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const service = new ListCustomersService();
    const Customers = await service.execute();

    return response.status(200).json(Customers);
  }

  async listById(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const service = new ListCustomerByIdService();
    const Customer = await service.execute(request.params.id);

    return response.status(200).json(Customer);
  }

  async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const service = new CreateCustomerService();
    const Customers = await service.execute(request.body);

    return response.status(201).json(Customers);
  }

  async update(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const service = new UpdateCustomerService();
    const Customer = await service.execute(request.params.id, request.body);

    return response.status(200).json(Customer);
  }

  async delete(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const service = new DeleteCustomerService();
    await service.execute(request.params.id);

    return response.status(204).json({});
  }
}
