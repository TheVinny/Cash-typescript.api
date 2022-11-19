import Account from '@modules/accounts/infra/model/AccountModel';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import connection from '@shared/infra/database/index';
import User from '../infra/model/userModel';
import { ICreateUser } from '../domain/interfaces/ICreateUser';
import { IUsersRepository } from '../domain/interfaces/IUsersRepository';
import { IUser } from '../domain/interfaces/IUser';

@EntityRepository(User)
export default class UserRepository implements IUsersRepository {
  private repository: Repository<User>;
  constructor() {
    this.repository = getRepository(User);
  }
  public async find(): Promise<IUser[]> {
    return await this.repository.find();
  }

  public async FindById(id: string): Promise<IUser | undefined> {
    const user = await this.repository.findOne(id);

    return user;
  }

  public async FindByUsername(username: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      where: {
        username,
      },
      relations: ['account'],
    });
    return user;
  }

  public async CreateAccount({
    password,
    username,
  }: ICreateUser): Promise<User | undefined> {
    const queryRunner = (await connection).createQueryRunner();
    const accountRepo = getRepository(Account);
    const accCreate = accountRepo.create();
    await queryRunner.startTransaction();

    try {
      const accSave = await queryRunner.manager.save(accCreate);
      const createdUser = this.repository.create({
        password,
        username,
        account: accSave,
      });
      await queryRunner.manager.save(createdUser);
      await queryRunner.commitTransaction();
      return createdUser;
    } catch {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  public async save(user: IUser): Promise<void> {
    await this.save(user);
  }
}
