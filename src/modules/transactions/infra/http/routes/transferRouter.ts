import AuthMiddleware from '@shared/infra/middlewares/AuthMiddleware';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import Filter from '../controllers/Filter';
import transfer from '../controllers/Transfer';

const transferRouter: Router = Router();

const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

const trasferMiddle = celebrate({
  [Segments.BODY]: {
    username: Joi.string().required().min(3).lowercase(),
    value: Joi.number().required().min(0),
  },
});

const filter = celebrate({
  [Segments.BODY]: {
    date: Joi.string().optional().regex(regex, 'Date format is not invalid'),
    filter: Joi.alternatives().valid('send', 'received').optional(),
  },
});

transferRouter.use(AuthMiddleware);
transferRouter.post('/', trasferMiddle, transfer.execute);
transferRouter.post('/all', filter, Filter.execute);

export default transferRouter;
