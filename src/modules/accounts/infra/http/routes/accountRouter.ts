import AuthMiddleware from '@shared/infra/middlewares/AuthMiddleware';
import { Router } from 'express';
import getAccount from '../controllers/getAccount';

const accountRouter: Router = Router();

accountRouter.use(AuthMiddleware);
accountRouter.get('/', getAccount.execute);

export default accountRouter;
