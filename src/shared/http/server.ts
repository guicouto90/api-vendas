import 'reflect-metadata';
import express, { NextFunction, Request, response, Response } from 'express';
import 'express-async-errors';
import { AppError } from './../errors/AppError';
import { routes } from './routes/index';
import cors from 'cors';
import '@shared/typeorm';
import { errors } from 'celebrate';
import uploadConfig from '@config/upload';

const app = express();

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
    return res.status(500).json({
      status: 'error',
      message: 'Internal error',
    });
  },
);

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('listening to port 3000'));
