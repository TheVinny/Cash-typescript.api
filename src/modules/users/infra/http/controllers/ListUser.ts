import { Request, Response } from 'express';
import ListUser from '@modules/users/services/ListUser';
import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';

class ListUserController {
  public async execute(_req: Request, res: Response) {
    const Listuser = container.resolve(ListUser);

    const users = await Listuser.execute();

    return res.json(instanceToInstance(users));
  }
}

export default new ListUserController();
