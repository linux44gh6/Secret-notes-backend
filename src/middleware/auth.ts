import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { JwtPayload, Role } from '../interfaces';
import AppError from '../utils/appError';


// req.user টাইপ যোগ করা
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const auth = (req: Request, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return next(new AppError(401, 'Unauthorized: token missing'));
  }

  try {
    const token = header.split(' ')[1];
    req.user = jwt.verify(token, env.jwtSecret) as JwtPayload;
    next();
  } catch {
    next(new AppError(401, 'Unauthorized: invalid or expired token'));
  }
};

export const requireRole =
  (...roles: Role[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError(403, 'Forbidden: access denied'));
    }
    next();
  };