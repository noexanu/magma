import { Server } from 'http';
import { logger } from '../../config';
import { appDataSource } from '../../config/database';
import { AMQPCloser } from './initAMQP.util';

export const initGracefulExit = (server: Server, closeAMQP: AMQPCloser): void => {
  const signals = ['SIGHUP', 'SIGINT', 'SIGTERM'] as const;

  const gracefulExit = async (): Promise<void> => {
    try {
      await closeAMQP();
      await appDataSource.destroy();
      server.close();
    } catch (error) {
      logger.error('graceful.error', error);
    } finally {
      logger.info('graceful.done');
      process.exit(0);
    }
  };

  signals.forEach((signal) => process.on(signal, gracefulExit));
};
