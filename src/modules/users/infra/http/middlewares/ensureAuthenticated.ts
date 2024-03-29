import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';


interface express {
  request: Request,
  response: Response,
  next: NextFunction,
}

interface TokenPayload {
  iat: number,
  exp: number,
  sub: string,

}
export default function ensureAuthenticated({ request, response, next }: express): void {

  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('JWT token is missing', 401);

  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, authConfig.jwt.secret)

    const { sub } = decoded as TokenPayload;

    request.user = { id: sub, }

    console.log(decoded);

    return next();


  } catch {
    throw new AppError('Invalid JWT token', 401);
  }


}