import Transaction from '@modules/transactions/infra/model/transactionModel';

export interface IAccount {
  id: string;
  balance: number;
  transaction: Transaction[];
}
