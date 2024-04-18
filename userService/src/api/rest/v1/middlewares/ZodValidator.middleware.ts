import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export const createZodValidatorMiddleware =
  (schema: ZodSchema) =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const validation = await schema.safeParseAsync(req);

    if (!validation.success) {
      return next(new Error(JSON.stringify(validation.error.format())));
    }

    next();
  };
