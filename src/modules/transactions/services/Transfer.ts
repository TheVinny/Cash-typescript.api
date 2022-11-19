import AppError from '@shared/errors/AppError';
import Transaction from '../infra/model/transactionModel';
import { ITransfer } from '../infra/domain/interfaces/ITransfer';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/users/domain/interfaces/IUsersRepository';
import { ITransactionRepository } from '../infra/domain/interfaces/ITransactionRepository';

@injectable()
class TransferAccount {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository,
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}
  public async execute({
    username,
    id,
    value,
  }: ITransfer): Promise<Transaction> {
    const user = await this.userRepository.getAccountInUser(id);

    if (!user) throw new AppError('user id not found', 404);

    if (username === user.username) throw new AppError('Invalid operation');

    if (user.account.balance < value) throw new AppError('Sold not enough');

    const receiver = await this.userRepository.FindByUsername(username);

    if (!receiver) throw new AppError('receiver username not found', 404);

    const transaction = await this.transactionRepository.transferTo({
      sender: user.account,
      receiver: receiver.account,
      value,
    });

    if (!transaction) throw new AppError('Error in transfer', 500);

    return transaction;
  }
}

export default TransferAccount;
