import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { isAuthenticated } from '@shared/infra/http/middlewares/isAuthenticated';
import { OrderController } from '../controllers/OrderController';

export const orderRoutes = Router();
const controller = new OrderController();

orderRoutes.use(isAuthenticated);

orderRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required().required(),
    },
  }),
  controller.listById,
);

orderRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.array()
        .items(
          Joi.object({
            id: Joi.string().uuid().required(),
            price: Joi.number().precision(2).strict().required(),
            quantity: Joi.number().strict().required(),
          }).required(),
        )
        .required(),
    },
  }),
  controller.create,
);
