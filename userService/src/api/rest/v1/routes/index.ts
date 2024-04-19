import { Router } from 'express';
import { UserService } from '../../../../services';
import { AMQPService } from '../../../../services/AMQPService';
import { AMQPSender } from '../../../../utils';
import { createHealthRouter } from './Health.route';
import { createUserRouter } from './User.route';

export const createRouter = (sendMessage: AMQPSender): Router => {
  const amqpService = new AMQPService(sendMessage);
  const userService = new UserService(amqpService);

  const router = Router();

  router.use('/user', createUserRouter(userService));
  router.use('/health', createHealthRouter());

  return router;
}
