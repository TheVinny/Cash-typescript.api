import Account from '@modules/accounts/infra/model/AccountModel';

export interface IAccountFound {
  sender: Account;
  receiver: Account;
  value: number;
}
