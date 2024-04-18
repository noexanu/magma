import path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from './config';

const isDev = path.dirname(__dirname).split(path.sep).pop() === 'src';

export const databaseConfig: DataSourceOptions = {
  type: 'mongodb',
  host: config.DB_HOST,
  port: config.DB_PORT,
  database: config.DB_DATABASE,
  ssl: config.DB_SSL,
  entities: [isDev ? './src/entities/*.ts' : './entities/*.js'],
  migrations: [isDev ? './src/migrations/*.ts' : './migrations/*.js'],
  synchronize: false,
};

export const appDataSource = new DataSource(databaseConfig);
