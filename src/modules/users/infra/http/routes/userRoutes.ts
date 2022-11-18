import AuthMiddleware from '@shared/infra/middlewares/AuthMiddleware';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import CreateUser from '../controllers/CreateUser';
import ListUser from '../controllers/ListUser';
import UpdateUser from '../controllers/UpdateUser';
import DeleteUser from '../controllers/DeleteUser';

const usersRouter: Router = Router();

const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const create = celebrate({
  [Segments.BODY]: {
    username: Joi.string().required().min(3).lowercase(),
    password: Joi.string().required().min(8).regex(re),
    password_confirmation: Joi.string()
      .valid(Joi.ref('password'))
      .when('password', { is: Joi.exist(), then: Joi.required() }),
  },
});

const update = celebrate({
  [Segments.BODY]: {
    username: Joi.string().required().min(3),
    old_password: Joi.string(),
    password: Joi.string().min(8).regex(re).optional(),
    password_confirmation: Joi.string()
      .valid(Joi.ref('password'))
      .when('password', { is: Joi.exist(), then: Joi.required() }),
  },
});

usersRouter.post('/', create, CreateUser.execute);
usersRouter.get('/', ListUser.execute);
usersRouter.use(AuthMiddleware);
usersRouter.delete('/', DeleteUser.execute);
usersRouter.put('/', update, UpdateUser.execute);

export default usersRouter;
