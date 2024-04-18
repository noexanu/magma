import { EventHandler, IncomingMessage, SupportedEvents } from './amqpRouter.type';

export class AMQPRouter {
  private eventMap = new Map<SupportedEvents, EventHandler>();

  on = (eventName: SupportedEvents, eventHandler: EventHandler) => {
    this.eventMap.set(eventName, eventHandler);
  }

  register = async ({ event, data }: IncomingMessage): Promise<void> => {
    await this.eventMap.get(event)?.(data);
  }
}
