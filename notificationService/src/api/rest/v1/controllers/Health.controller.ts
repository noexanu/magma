import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { config } from '../../../../config';

export class HealthController {
  status = (_req: Request, res: Response): void => {
    res.status(StatusCodes.OK).json({ name: config.SERVICE_QUEUE_NAME });
  };
}
