import { Router } from 'express';
import { createHealthRouter } from './Health.route';

export const createRouter = (): Router => {
  const router = Router();

  router.use('/health', createHealthRouter());

  return router;
}