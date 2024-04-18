import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserService } from '../../../../services';
import { UserCreateReq, UserDeleteReq, UserReadReq, UserUpdateReq } from './User.controller.type';

export class UserController {
  constructor(private readonly userService: UserService) {}

  read = async (req: UserReadReq, res: Response): Promise<void> => {
    const user = await this.userService.read(req.params.id);

    res.status(StatusCodes.OK).json(user);
  };

  create = async (req: UserCreateReq, res: Response): Promise<void> => {
    const user = await this.userService.create(req.body);

    res.status(StatusCodes.CREATED).json(user);
  };

  update = async (req: UserUpdateReq, res: Response): Promise<void> => {
    const user = await this.userService.update(req.params.id, req.body);

    res.status(StatusCodes.OK).json(user);
  };

  delete = async (req: UserDeleteReq, res: Response): Promise<void> => {
    await this.userService.delete(req.params.id);

    res.status(StatusCodes.OK).json({ deleted: req.params.id });
  };
}
