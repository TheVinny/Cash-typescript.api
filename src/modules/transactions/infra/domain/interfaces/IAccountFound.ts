import Account from '@modules/accounts/infra/model/AccountModel';

export interface IAccountFound {
  senderAccount: Account;
  receiverAccount: Account;
  value: number;
}
