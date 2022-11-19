import { ICreateUser } from './ICreateUser';
import { IUser } from './IUser';

export interface IUsersRepository {
  FindByUsername(username: string): Promise<IUser | undefined>;
  CreateAccount({
    password,
    username,
  }: ICreateUser): Promise<IUser | undefined>;
  FindById(id: string): Promise<IUser | undefined>;
  save(user: IUser): Promise<void>;
  find(): Promise<IUser[]>;
  remove(user: IUser): Promise<void>;
  getAccountInUser(id: string): Promise<IUser | undefined>;
}
