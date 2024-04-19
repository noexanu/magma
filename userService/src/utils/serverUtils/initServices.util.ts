import { AMQPCloser, AMQPSender, initAMQP } from './initAMQP.util';
import { initDatabase } from './initDatabase.util';

export const initServices = async (): Promise<[{ sendMessage: AMQPSender, closeAMQP: AMQPCloser}, void]> => {
  return Promise.all([initAMQP(), initDatabase()]);
};
