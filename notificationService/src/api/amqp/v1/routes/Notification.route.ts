import { AMQPRouter } from '../../../../utils';
import { NotificationController } from '../controllers';

export const createNotificationRouter = () => {
  const router = new AMQPRouter();
  const healthController = new NotificationController();

  router.on('create', healthController.handleCreateEvent);
  router.on('delete', healthController.handleDeleteEvent);

  return router.register;
};
