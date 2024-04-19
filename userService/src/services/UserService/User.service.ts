import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';
import { UserDTO } from '../../api/rest/v1/controllers';
import { appDataSource } from '../../config';
import { User } from '../../entities';
import { AMQPService } from '../AMQPService';
import { USER_SERVICE_ERROR_MESSAGES } from './User.service.const';

export class UserService {
  constructor(private amqpService: AMQPService) {}

  private getRepository(): Repository<User> {
    return appDataSource.getMongoRepository(User);
  }

  async read(id: string): Promise<User> {
    const repository = this.getRepository();
    const _id = new ObjectId(id);
    const existingUser = await repository.findOneBy({ _id });

    if (!existingUser) {
      throw new Error(USER_SERVICE_ERROR_MESSAGES.unableToFind);
    }

    return existingUser;
  }

  async create(createDTO: UserDTO): Promise<User> {
    const repository = this.getRepository();
    const existingUser = await repository.findOneBy({ email: createDTO.email });

    if (existingUser) {
      throw new Error(USER_SERVICE_ERROR_MESSAGES.unableToCreate);
    }

    const user = repository.create(createDTO);

    const createdUser = await repository.save(user);

    await this.amqpService.sendCreateNotification(createdUser);

    return createdUser;
  }

  async update(id: string, updateDTO: Partial<UserDTO>): Promise<User> {
    const repository = this.getRepository();
    const _id = new ObjectId(id);
    const existingUser = await repository.findOneBy({ _id });

    if (!existingUser) {
      throw new Error(USER_SERVICE_ERROR_MESSAGES.unableToFind);
    }

    const user = repository.create({
      ...existingUser,
      ...updateDTO,
    });

    const updatedUser = await repository.save(user);

    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    const repository = this.getRepository();
    const _id = new ObjectId(id);

    await this.amqpService.sendDeleteNotification({ _id });

    await repository.delete({ _id });
  }
}
