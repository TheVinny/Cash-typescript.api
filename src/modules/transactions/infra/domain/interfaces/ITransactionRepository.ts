import Transaction from '../../model/transactionModel';
import { IAccountFound } from './IAccountFound';
import { IFilter } from './IFilter';

export interface ITransactionRepository {
  getByFilter({ filter, id, date }: IFilter): Promise<Transaction[]>;
  transferTo({
    sender,
    receiver,
    value,
  }: IAccountFound): Promise<Transaction | undefined>;
}
