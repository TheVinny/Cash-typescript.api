import { getCustomRepository } from 'typeorm';
import { hash } from 'bcrypt';
import User from '../infra/model/userModel';
import UserRepository from '../repository/userRepository';
import AppError from '@shared/errors/AppError';
import { ICreateUser } from '../domain/interfaces/ICreateUser';

class CreateUser {
  public async execute({ password, username }: ICreateUser): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const userExists = await userRepository.FindByUsername(username);

    if (userExists) throw new AppError('Username has already exists', 409);

    const hashpass = await hash(password, 8);

    const creating = await userRepository.CreateAccount({
      password: hashpass,
      username,
    });

    if (!creating) throw new AppError('Error during create account');

    return creating;
  }
}

export default new CreateUser();
