import {
  EntityRepository,
  getCustomRepository,
  getRepository,
  Repository,
} from 'typeorm';
import UserRepository from '@modules/users/repository/userRepository';
import Account from '../infra/model/AccountModel';
import { IAccount } from '../infra/domain/interfaces/IAccount';
import { IAccountRepository } from '../infra/domain/interfaces/IAccountRepository';

@EntityRepository(Account)
export default class AccountRepository implements IAccountRepository {
  private repository: Repository<Account>;

  constructor() {
    this.repository = getRepository(Account);
  }

  public async FindById(id: string): Promise<IAccount | undefined> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.getAccountInUser(id);

    if (!user) return user;

    const account = await this.repository.findOne(user?.account);

    return account;
  }
}
