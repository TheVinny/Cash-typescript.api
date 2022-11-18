import UserRepository from '@modules/users/repository/userRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { IFilter } from '../infra/domain/interfaces/IFilter';
import Transaction from '../infra/model/transactionModel';
import TransactionRepository from '../repository/TransactionRepository';

class GetByFilter {
  public async execute({ id, filter, date }: IFilter): Promise<Transaction[]> {
    const transactionRepo = getCustomRepository(TransactionRepository);
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(id, { relations: ['account'] });

    if (!user) throw new AppError('id not found', 404);

    const transactions = await transactionRepo.getByFilter({
      filter,
      id: user.account.id,
      date,
    });

    return transactions;
  }
}

export default new GetByFilter();
