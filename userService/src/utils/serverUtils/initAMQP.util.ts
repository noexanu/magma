import { connect } from 'amqplib';
import { config, logger } from '../../config';

const EXCHANGE_TYPE = 'fanout';
const ROUTING_KEY = '';

export type AMQPSender = <T>(data: T) => Promise<void> | void;
export type AMQPCloser = () => Promise<void>;

export const initAMQP = async () => {
  const connection = await connect(config.RABBITMQ_URL);
  const channel = await connection.createChannel();

  await channel.assertExchange(config.EXCHANGE_NAME, EXCHANGE_TYPE);

  const sendMessage: AMQPSender = async (data) => {
    const stringifiedData = JSON.stringify(data);

    await channel.publish(
      config.EXCHANGE_NAME,
      ROUTING_KEY,
      Buffer.from(stringifiedData)
    );

    logger.info(`Message published to ${config.EXCHANGE_NAME} exchange`, )
  };

  const closeAMQP: AMQPCloser = async () => {
    await connection.close();
  };

  return { closeAMQP, sendMessage };
}
