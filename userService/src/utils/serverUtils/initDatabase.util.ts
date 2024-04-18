import { appDataSource } from '../../config/database';

export const initDatabase = async (): Promise<void> => {
  await appDataSource.initialize();
};
