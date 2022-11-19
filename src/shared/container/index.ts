import { container } from 'tsyringe';

import { IUsersRepository } from '@modules/users/domain/interfaces/IUsersRepository';
import { IAccountRepository } from '@modules/accounts/infra/domain/interfaces/IAccountRepository';
import { ITransaction } from '@modules/transactions/infra/domain/interfaces/ITransaction';
import TransactionRepository from '@modules/transactions/repository/TransactionRepository';
import UserRepository from '@modules/users/repository/userRepository';
import AccountRepository from '@modules/accounts/repository/AccountRepository';

container.registerSingleton<IUsersRepository>('UserRepository', UserRepository);
container.registerSingleton<IAccountRepository>(
  'AccountRepository',
  AccountRepository,
);
container.registerSingleton<ITransaction>(
  'TransactionRepository',
  TransactionRepository,
);
