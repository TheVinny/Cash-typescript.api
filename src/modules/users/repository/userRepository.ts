import Account from '@modules/accounts/infra/model/AccountModel';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import connection from '@shared/infra/database/index';
import IUserRequest from '../interface/IUserRequest';
import User from '../infra/model/userModel';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public async FindByUsername(username: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        username,
      },
      relations: ['account'],
    });

    console.log(user);

    return user;
  }

  public async CreateAccount({
    password,
    username,
  }: IUserRequest): Promise<User | undefined> {
    const queryRunner = (await connection).createQueryRunner();
    const accountRepo = getRepository(Account);
    const accCreate = accountRepo.create();
    await queryRunner.startTransaction();

    try {
      const accSave = await queryRunner.manager.save(accCreate);
      const createdUser = this.create({
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
}
