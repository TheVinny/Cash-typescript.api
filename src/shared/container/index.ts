import { container } from 'tsyringe';

import { IUsersRepository } from '@modules/users/domain/interfaces/IUsersRepository';
import UserRepository from '@modules/users/repository/userRepository';

container.registerSingleton<IUsersRepository>('UserRepository', UserRepository);
