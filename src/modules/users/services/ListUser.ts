import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/interfaces/IUsersRepository';
import User from '../infra/model/userModel';

@injectable()
class ListUser {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}
  public async execute(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users;
  }
}

export default ListUser;
