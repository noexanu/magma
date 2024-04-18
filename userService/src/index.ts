import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import 'reflect-metadata';
import { errorHandlerMiddleware } from './api/rest/v1/middlewares';
import { createRouter as createV1Router } from './api/rest/v1/routes';
import { config, logger } from './config';
import { initGracefulExit, initServices } from './utils/serverUtils';

const bootstrap = async (): Promise<void> => {
  const { PORT: port } = config;
  const app = express();

  await initServices();

  app.set('trust proxy', 'loopback');
  app.use(helmet());
  app.use(cors({ origin: true }));
  app.use(express.json());
  app.use('/api/v1', createV1Router());
  app.use(errorHandlerMiddleware);

  const server = app.listen(port);

  initGracefulExit(server);

  logger.info('Started', { port });
};

bootstrap().catch((err) => logger.error(err));
