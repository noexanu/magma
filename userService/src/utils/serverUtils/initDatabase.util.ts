import { appDataSource } from '../../config/database';

export const initDatabase = async (): Promise<void> => {

  try{
    await appDataSource.initialize();

  } catch (err) {
    console.log('/////////////////////////', err)
  }
};
