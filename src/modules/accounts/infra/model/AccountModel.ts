import Transaction from '@modules/transactions/infra/model/transactionModel';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IAccount } from '../domain/interfaces/IAccount';

@Entity('accounts')
class Account implements IAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  balance: number;

  @OneToMany(() => Transaction, transaction => transaction.id)
  @JoinColumn()
  transaction: Transaction[];
}

export default Account;
