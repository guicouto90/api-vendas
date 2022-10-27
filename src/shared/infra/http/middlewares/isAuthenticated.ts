import { Request, NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AppError } from '@shared/errors/AppError';

dotenv.config();

interface ITokenPayload {
  email: string;
  id: string;
  iat: number;
  exp: number;
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AppError('Jwt Token is missing', 401);

  const [, token] = authHeader.split(' ');
  try {
    const decodeToken = verify(
      token,
      process.env.SECRET as string,
    ) as ITokenPayload;

    req.user = { email: decodeToken.email, id: decodeToken.id };

    return next();
  } catch (error) {
    next(error);
  }
};
