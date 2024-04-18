import { connect } from 'amqplib';
import { config, logger } from '../../config';

const EXCHANGE_TYPE = 'fanout';
const BINDING_KEY = '';

export type AMQPListener = (data: any) => Promise<void> | void;
export type AMQPCloser = () => Promise<void>;

export const initAMQP = async (amqpListener: AMQPListener) => {
  const connection = await connect(config.RABBITMQ_URL);
  const channel = await connection.createChannel();

  await channel.assertExchange(config.EXCHANGE_NAME, EXCHANGE_TYPE);

  const { queue } = await channel.assertQueue(config.SERVICE_QUEUE_NAME);

  await channel.bindQueue(queue, config.EXCHANGE_NAME, BINDING_KEY);

  const { consumerTag } = await channel.consume(queue, async (msg) => {
    if (msg) {
      const messageString = msg.content.toString();
      const data = JSON.parse(messageString);

      try {
        await amqpListener(data);
      } catch (err) {
        logger.error(err);
      } finally {
        channel.ack(msg);
      }
    }
  });

  const closeAMQP: AMQPCloser = async () => {
    await channel.cancel(consumerTag);
    await connection.close();
  };

  return closeAMQP;
}
