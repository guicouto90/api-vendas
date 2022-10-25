import { isAuthenticated } from './../../../shared/middlewares/isAuthenticated';
import { UserController } from './../controllers/UserController';
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';

export const userRoute = Router();
const controller = new UserController();
const upload = multer(uploadConfig);

userRoute.get('/', isAuthenticated, controller.list);

userRoute.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  controller.listById,
);

userRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    },
  }),
  controller.create,
);

userRoute.post(
  '/login',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    },
  }),
  controller.login,
);

userRoute.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  controller.uploadAvatar,
);
