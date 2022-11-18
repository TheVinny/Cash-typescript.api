import { getCustomRepository } from 'typeorm';
import UserRepository from '../repository/userRepository';
import AppError from '@shared/errors/AppError';

class DeleteUser {
  public async execute(id: string): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);

    const UserExists = await userRepository.findOne(id);

    if (!UserExists) throw new AppError('ID not exists', 404);

    userRepository.remove(UserExists);
  }
}

export default new DeleteUser();
