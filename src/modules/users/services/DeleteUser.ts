import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { IUsersRepository } from '../domain/interfaces/IUsersRepository';

@injectable()
class DeleteUser {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const UserExists = await this.userRepository.FindById(id);

    if (!UserExists) throw new AppError('ID not exists', 404);

    await this.userRepository.remove(UserExists);
  }
}

export default DeleteUser;
