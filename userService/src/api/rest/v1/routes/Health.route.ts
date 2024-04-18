import { Router } from 'express';
import { HealthController } from '../controllers';

export const createHealthRouter = (): Router => {
  const router = Router();
  const healthController = new HealthController();

  router.get('/', healthController.status);

  return router;
};
