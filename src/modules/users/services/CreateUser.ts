import { hash } from 'bcrypt';
import AppError from '@shared/errors/AppError';
import { ICreateUser } from '../domain/interfaces/ICreateUser';
import { IUsersRepository } from '../domain/interfaces/IUsersRepository';
import { IUser } from '../domain/interfaces/IUser';

class CreateUser {
  constructor(private userRepository: IUsersRepository) {}

  public async execute({ password, username }: ICreateUser): Promise<IUser> {
    const userExists = await this.userRepository.FindByUsername(username);

    if (userExists) throw new AppError('Username has already exists', 409);

    const hashpass = await hash(password, 8);

    const creating = await this.userRepository.CreateAccount({
      password: hashpass,
      username,
    });

    if (!creating) throw new AppError('Error during create account');

    return creating;
  }
}

export default CreateUser;
