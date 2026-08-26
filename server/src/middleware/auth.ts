import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import { User, IUser } from '../models/User.js';
import { AppError } from './errorHandler.js';

export interface AuthRequest extends Request {
  user?: IUser;
}

export const protect = async (req: AuthRequest, _res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) throw new AppError('Not authorized', 401);

    const decoded = jwt.verify(token, config.jwt.accessSecret) as { id: string };
    const user = await User.findById(decoded.id).select('-password -refreshToken');
    if (!user || !user.isActive) throw new AppError('Not authorized', 401);

    req.user = user;
    next();
  } catch {
    next(new AppError('Not authorized', 401));
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError('Forbidden', 403));
    }
    next();
  };
};

export const optionalAuth = async (req: AuthRequest, _res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.accessToken;
    if (token) {
      const decoded = jwt.verify(token, config.jwt.accessSecret) as { id: string };
      const user = await User.findById(decoded.id).select('-password -refreshToken');
      if (user?.isActive) req.user = user;
    }
  } catch {
    // optional
  }
  next();
};
