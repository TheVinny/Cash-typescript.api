import Account from '@modules/accounts/infra/model/AccountModel';

export interface IUser {
  id: string;
  username: string;
  password: string;
  account: Account;
}
