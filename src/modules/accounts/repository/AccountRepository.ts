import Account from '@modules/accounts/infra/model/AccountModel';
import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import UserRepository from '@modules/users/repository/userRepository';

@EntityRepository(Account)
export default class AccountRepository extends Repository<Account> {
  public async FindById(id: string): Promise<Account | undefined> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({
      where: {
        id,
      },
      relations: ['account'],
    });

    const account = await this.findOne(user?.account.id);
    return account;
  }
}
