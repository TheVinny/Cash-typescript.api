import Account from '@modules/accounts/infra/model/AccountModel';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { ITransaction } from '../domain/interfaces/ITransaction';

@Entity('transactions')
class Transaction implements ITransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Account, acc => acc.id)
  @JoinColumn({ name: 'debitedAccount_id', referencedColumnName: 'id' })
  @Exclude()
  debitedAccount_id: Account;

  @ManyToOne(() => Account, acc => acc.id)
  @JoinColumn({ name: 'creditedAccount_id', referencedColumnName: 'id' })
  @Exclude()
  creditedAccount_id: Account;

  @Column('decimal')
  value: number;

  @CreateDateColumn()
  created_at: Date;
}

export default Transaction;
