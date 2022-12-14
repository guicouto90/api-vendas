import { Request, Response, NextFunction } from 'express';
import { Algorithm, sign, verify } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (email: string, id: string) => {
  const algorithm: Algorithm = 'HS256';

  const jwtConfig = {
    expiresIn: '7d',
    algorithm,
  };

  const token = sign({ email, id }, process.env.SECRET as string, jwtConfig);
  return token;
};
