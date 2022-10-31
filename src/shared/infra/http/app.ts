import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { routes } from './routes/index';
import cors from 'cors';
import '@shared/container';
import '@shared/infra/typeorm';
import { errors } from 'celebrate';
import uploadConfig from '@config/upload';
import { AppError } from '@shared/errors/AppError';

export const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(errors());

app.use(
  (error: Error, req: Request, res: Response, next: NextFunction): Response => {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    if (error.message) {
      return res.status(400).json({
        status: 'error',
        message: error.message,
      });
    }
    return res.status(500).json({
      status: 'error',
      message: 'Internal Error',
    });
  },
);
