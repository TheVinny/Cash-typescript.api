// import Account from '@modules/accounts/model/AccountModel';
import Account from '@modules/accounts/infra/model/AccountModel';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { IUser } from '@modules/users/domain/interfaces/IUser';

import { Exclude } from 'class-transformer';

@Entity('users')
class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @OneToOne(() => Account)
  @JoinColumn({ name: 'account_id' })
  @Exclude()
  account: Account;
}

export default User;
