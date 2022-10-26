import { isAuthenticated } from './../../../shared/middlewares/isAuthenticated';
import { CustomersController } from '../controllers/CustomersController';
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

export const customersRoutes = Router();
const controller = new CustomersController();

customersRoutes.use(isAuthenticated);

customersRoutes.get('/', controller.list);
customersRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  controller.listById,
);

customersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  controller.create,
);

customersRoutes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  controller.update,
);

customersRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  controller.delete,
);
