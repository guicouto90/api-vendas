import { UserPasswordController } from '../controllers/UserPasswordController';
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

export const userPasswordRoute = Router();
const controller = new UserPasswordController();

userPasswordRoute.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  controller.createToken,
);

userPasswordRoute.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().min(6).required(),
      passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  controller.resetPassword,
);
