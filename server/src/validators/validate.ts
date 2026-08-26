import { Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => {
  return (req: { body: unknown }, _res: Response, next: NextFunction) => {
    req.body = schema.parse(req.body);
    next();
  };
};
