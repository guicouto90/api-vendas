import { DeleteCustomerService } from './../../../services/DeleteCustomerService';
import { UpdateCustomerService } from './../../../services/UpdateCustomerService';
import { ListCustomerByIdService } from './../../../services/ListCustomerByIdService';
import { container } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { CreateCustomerService } from '@modules/customers/services/CreateCustomerService';
import { ListCustomersService } from '@modules/customers/services/ListCustomersService';

export class CustomersController {
  async list(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const service = container.resolve(ListCustomersService);
    const customer = await service.execute();

    return response.status(200).json(customer);
  }

  async listById(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const service = container.resolve(ListCustomerByIdService);
    const Customer = await service.execute(request.params.id);

    return response.status(200).json(Customer);
  }

  async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const service = container.resolve(CreateCustomerService);
    const customers = await service.execute(request.body);

    return response.status(201).json(customers);
  }

  async update(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const service = container.resolve(UpdateCustomerService);
    const Customer = await service.execute(request.params.id, request.body);

    return response.status(200).json(Customer);
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
