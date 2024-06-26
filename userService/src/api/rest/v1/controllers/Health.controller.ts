import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class HealthController {
  status = (_req: Request, res: Response): void => {
    res.status(StatusCodes.OK).json({ ping: 'pong' });
  };
}
