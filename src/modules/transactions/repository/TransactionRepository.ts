import { EntityRepository, getRepository, Repository } from 'typeorm';
import Transaction from '../infra/model/transactionModel';
import connection from '@shared/infra/database';
import { IAccountFound } from '../infra/domain/interfaces/IAccountFound';
import { IFilter } from '../infra/domain/interfaces/IFilter';
import { EFilter } from '../infra/domain/interfaces/EFilter';
import moment from 'moment';
import { ITransaction } from '../infra/domain/interfaces/ITransaction';
import { ITransactionRepository } from '../infra/domain/interfaces/ITransactionRepository';

@EntityRepository(Transaction)
export default class TransactionRepo implements ITransactionRepository {
  private repository: Repository<Transaction>;

  constructor() {
    this.repository = getRepository(Transaction);
  }

  public async transferTo({
    sender,
    receiver,
    value,
  }: IAccountFound): Promise<ITransaction | undefined> {
    const queryRunner = (await connection).createQueryRunner();

    const { balance } = receiver;

    sender.balance -= value;
    receiver.balance = Number(balance) + value;

    const transaction = this.repository.create({
      debitedAccount_id: sender,
      creditedAccount_id: receiver,
      value,
    });

    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(sender);
      await queryRunner.manager.save(receiver);
      await queryRunner.manager.save(transaction);
      await queryRunner.commitTransaction();
      return transaction;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  public async getByFilter({
    filter,
    id,
    date,
  }: IFilter): Promise<Transaction[]> {
    if (filter && date) {
      console.log(EFilter[filter]);
      const dateformat = moment(date, 'DD/MM/YYYY');
      const transactions = await this.repository.find({
        where: [
          {
            [EFilter['send']]: id,
            created_at: dateformat,
          },
        ],
      });
      return transactions;
    }

    if (date) {
      const dateformat = moment(date, 'DD/MM/YYYY');
      const transactions = await this.repository.find({
        where: {
          created_at: dateformat,
        },
      });
      return transactions;
    }

    if (filter) {
      const transactions = await this.repository.find({
        where: {
          [EFilter[filter]]: id,
        },
      });
      return transactions;
    }

    const transactions = await this.repository.find();
    return transactions;
  }
}
