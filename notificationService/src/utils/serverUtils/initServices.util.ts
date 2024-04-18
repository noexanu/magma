import { createNotificationRouter } from "../../api/amqp/v1/routes";
import { AMQPCloser, initAMQP } from "./initAMQP.util";

export const initServices = async (): Promise<[AMQPCloser]> => {
  const notificationRouter = createNotificationRouter();

  return Promise.all([initAMQP(notificationRouter)]);
};
