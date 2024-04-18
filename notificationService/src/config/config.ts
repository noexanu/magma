import dotenv from 'dotenv';
import { parseEnv } from 'znv';
import z from 'zod';

dotenv.config();

const DEFAULT_PORT = 8080;
const DEFAULT_RABBITMQ_URL = 'amqp://localhost';

const configSchema = {
  PORT: z.number().optional().default(DEFAULT_PORT),
  RABBITMQ_URL: z.string().optional().default(DEFAULT_RABBITMQ_URL),
  EXCHANGE_NAME: z.string(),
  SERVICE_QUEUE_NAME: z.string(),
} as const;

export const config = parseEnv(process.env, configSchema);
