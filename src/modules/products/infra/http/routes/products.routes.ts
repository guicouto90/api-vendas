import { ProductsController } from './../controllers/ProductsController';
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { isAuthenticated } from '@shared/infra/http/middlewares/isAuthenticated';

export const productRoutes = Router();
const controller = new ProductsController();

productRoutes.use(isAuthenticated);

productRoutes.get('/', controller.list);
productRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  controller.listById,
);

productRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).strict().required(),
      quantity: Joi.number().strict().required(),
    },
  }),
  controller.create,
);

productRoutes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  controller.update,
);

productRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  controller.delete,
);
