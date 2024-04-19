import { User } from '../../entities';
import { AMQPSender } from '../../utils';
import { OutgoingMessage } from './AMQP.service.type';

export class AMQPService {
  private sendMessage: AMQPSender;

  constructor(sendMessage: AMQPSender) {
    this.sendMessage = sendMessage;
  }

  sendCreateNotification = async (user: Partial<User>) => {
    await this.sendMessage<OutgoingMessage>({
      event: 'create',
      data: user,
    });
  }

  sendDeleteNotification = async (user: Partial<User>) => {
    await this.sendMessage<OutgoingMessage>({
      event: 'delete',
      data: user,
    });
  }
}
