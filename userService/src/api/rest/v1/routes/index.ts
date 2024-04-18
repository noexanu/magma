import { Router } from 'express';
import { UserService } from '../../../../services';
import { createHealthRouter } from './Health.route';
import { createUserRouter } from './User.route';

export const createRouter = (): Router => {
  const userService = new UserService();

  const router = Router();

  router.use('/user', createUserRouter(userService));
  router.use('/health', createHealthRouter());

  return router;
}