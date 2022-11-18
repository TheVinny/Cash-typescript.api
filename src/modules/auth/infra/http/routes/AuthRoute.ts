import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import CreateAuth from '../controller/CreateAuth';

const authRouter: Router = Router();

const authvalid = celebrate({
  [Segments.BODY]: {
    username: Joi.string().required().min(3),
    password: Joi.string().required(),
  },
});

authRouter.post('/', authvalid, CreateAuth.execute);

export default authRouter;
