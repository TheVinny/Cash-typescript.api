import { EntityRepository, Repository } from 'typeorm';
import Transaction from '../infra/model/transactionModel';
import connection from '@shared/infra/database';
import { IAccountFound } from '../infra/domain/interfaces/IAccountFound';
import { IFilter } from '../infra/domain/interfaces/IFilter';
import { EFilter } from '../infra/domain/interfaces/EFilter';
import moment from 'moment';

@EntityRepository(Transaction)
export default class TransactionRepo extends Repository<Transaction> {
  public async transferTo({
    senderAccount,
    receiverAccount,
    value,
  }: IAccountFound): Promise<Transaction | undefined> {
    const queryRunner = (await connection).createQueryRunner();

    const { balance } = receiverAccount;

    senderAccount.balance -= value;
    receiverAccount.balance = Number(balance) + value;

    const transaction = this.create({
      debitedAccount_id: senderAccount,
      creditedAccount_id: receiverAccount,
      value,
    });

    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(senderAccount);
      await queryRunner.manager.save(receiverAccount);
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
    console.log(EFilter);
    if (filter && date) {
      const dateformat = moment(date, 'DD/MM/YYYY');
      const transactions = await this.find({
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
      const transactions = await this.find({
        where: {
          created_at: dateformat,
        },
      });
      return transactions;
    }

    if (filter) {
      const transactions = await this.find({
        where: {
          [EFilter[filter]]: id,
        },
        relations: ['account.user'],
      });
      return transactions;
    }

    const transactions = await this.find();
    return transactions;
  }
}
