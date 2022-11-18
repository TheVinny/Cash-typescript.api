import accountRouter from '@modules/accounts/infra/http/routes/accountRouter';
import authRouter from '@modules/auth/infra/http/routes/AuthRoute';
import transferRouter from '@modules/transactions/infra/http/routes/transferRouter';
import usersRouter from '@modules/users/infra/http/routes/userRoutes';
import { Router } from 'express';

const routes: Router = Router();

routes.use('/users', usersRouter);
routes.use('/auth', authRouter);
routes.use('/account', accountRouter);
routes.use('/transfer', transferRouter);
export default routes;
