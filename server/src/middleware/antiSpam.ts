import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler.js';

const honeypotFields = ['website', 'url', 'company_url'];

export const antiSpam = (req: Request, _res: Response, next: NextFunction) => {
  for (const field of honeypotFields) {
    if (req.body[field]) {
      return next(new AppError('Submission rejected', 400));
    }
  }
  next();
};
