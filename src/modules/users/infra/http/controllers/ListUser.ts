import { Request, Response } from 'express';
import ListUser from '@modules/users/services/ListUser';
import { instanceToInstance } from 'class-transformer';

class ListUserController {
  public async execute(_req: Request, res: Response) {
    const users = await ListUser.execute();

    return res.json(instanceToInstance(users));
  }
}

export default new ListUserController();
