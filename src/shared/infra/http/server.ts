import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from '@shared/infra/http/routes';
import '@shared/infra/database';
import ErrorMiddleware from '@shared/infra/middlewares/ErrorMiddleware';
import { errors } from 'celebrate';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(errors());

app.use(ErrorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Rodando na porta ${process.env.PORT}`);
});
