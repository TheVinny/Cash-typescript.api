import UserRepository from '@modules/users/repository/userRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Transaction from '../infra/model/transactionModel';
import TransactionRepository from '../repository/TransactionRepository';
import { ITransfer } from '../infra/domain/interfaces/ITransfer';

class TransferAccount {
  public async execute({
    username,
    id,
    value,
  }: ITransfer): Promise<Transaction> {
    const transactionRepo = getCustomRepository(TransactionRepository);
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.getAccountInUser(id);

    if (!user) throw new AppError('user id not found', 404);

    if (username === user.username) throw new AppError('Invalid operation');

    if (user.account.balance < value) throw new AppError('Sold not enough');

    const receiver = await userRepository.FindByUsername(username as string);

    if (!receiver) throw new AppError('receiver username not found', 404);

    const transaction = await transactionRepo.transferTo({
      sender: user.account,
      receiver: receiver.account,
      value,
    });

    if (!transaction) throw new AppError('Error in transfer', 500);

    return transaction;
  }
}

export default new TransferAccount();
