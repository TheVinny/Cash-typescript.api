import { IAccount } from './IAccount';

export interface IAccountRepository {
  FindById(id: string): Promise<IAccount | undefined>;
}
