import Account from '@modules/accounts/infra/model/AccountModel';

export interface ITransaction {
  id: string;
  debitedAccount_id: Account;
  creditedAccount_id: Account;
  value: number;
  created_at: Date;
}
