import { getCustomRepository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import User from '../infra/model/userModel';
import UserRepository from '../repository/userRepository';
import AppError from '@shared/errors/AppError';
import { IUpdateUser } from '../domain/interfaces/IUpdateUser';

class UpdateUser {
  public async execute({
    id,
    password,
    username,
    old_password,
  }: IUpdateUser): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const userExists = await userRepository.findOne(id);

    if (!userExists) throw new AppError('ID not found', 500);

    const usernameExists = await userRepository.FindByUsername(
      username as string,
    );

    if (usernameExists && usernameExists.username !== username) {
      throw new AppError('already one user with this username.');
    }

    if (password && !old_password) {
      throw new AppError('Old password is required.');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, userExists.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      userExists.password = await hash(password, 8);
    }

    const hashpass = await hash(password, 8);

    userExists.username = username || userExists.username;
    userExists.password = hashpass || userExists.password;

    await userRepository.save(userExists);

    return userExists;
  }
}

export default new UpdateUser();
