import { initDatabase } from './initDatabase.util';

export const initServices = async (): Promise<unknown[]> => {
  return Promise.all([initDatabase()]);
};
