import dotenv from 'dotenv';
import { parseEnv } from 'znv';
import z from 'zod';

dotenv.config();

const DEFAULT_PORT = 8080;
const DEFAULT_DB_HOST = 'localhost';
const DEFAULT_RABBITMQ_URL = 'amqp://localhost';

const configSchema = {
  PORT: z.number().optional().default(DEFAULT_PORT),
  DB_HOST: z.string().optional().default(DEFAULT_DB_HOST),
  DB_PORT: z.number(),
  DB_DATABASE: z.string(),
  DB_SSL: z.boolean(),
  RABBITMQ_URL: z.string().optional().default(DEFAULT_RABBITMQ_URL),
  EXCHANGE_NAME: z.string(),
} as const;

export const config = parseEnv(process.env, configSchema);
