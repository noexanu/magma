import { Router } from 'express';
import { UserService } from '../../../../services';
import { UserController, userCreateSchema, userDeleteSchema, userReadSchema, userUpdateSchema } from '../controllers';
import { asyncMiddlewareWrapper, createZodValidatorMiddleware } from '../middlewares';

export const createUserRouter = (userService: UserService): Router => {
  const userController = new UserController(userService);

  const router = Router();

  router.get('/:id', createZodValidatorMiddleware(userReadSchema), asyncMiddlewareWrapper(userController.read));
  router.post('/', createZodValidatorMiddleware(userCreateSchema), asyncMiddlewareWrapper(userController.create));
  router.put('/:id', createZodValidatorMiddleware(userUpdateSchema), asyncMiddlewareWrapper(userController.update));
  router.delete('/:id', createZodValidatorMiddleware(userDeleteSchema), asyncMiddlewareWrapper(userController.delete));

  return router;
};
