import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { logger } from '../../../../config';

export const errorHandlerMiddleware = (error: Error, _req: Request, res: Response, _next: NextFunction): void => {
  logger.error(error.message, error);

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
};
