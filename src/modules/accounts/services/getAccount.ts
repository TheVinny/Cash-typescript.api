import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IAccountRepository } from '../infra/domain/interfaces/IAccountRepository';
import Account from '../infra/model/AccountModel';

@injectable()
class getAccount {
  constructor(
    @inject('AccountRepository')
    private AccountRepository: IAccountRepository,
  ) {}

  public async execute(id: string): Promise<Account> {
    const account = await this.AccountRepository.FindById(id);

    if (!account) throw new AppError('Account not found', 400);

    return account;
  }
}

export default getAccount;
