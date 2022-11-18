import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Account from '../infra/model/AccountModel';
import AccountRepository from '../repository/AccountRepository';

class getAccount {
  public async execute(id: string): Promise<Account> {
    const accountRepository = getCustomRepository(AccountRepository);

    const account = await accountRepository.FindById(id);

    if (!account) throw new AppError('Account not found', 400);

    return account;
  }
}

export default new getAccount();
