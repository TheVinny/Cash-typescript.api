import { getCustomRepository } from 'typeorm';
import User from '../infra/model/userModel';
import UserRepository from '../repository/userRepository';

class ListUser {
  public async execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository);

    const users = await userRepository.find();

    return users;
  }
}

export default new ListUser();
