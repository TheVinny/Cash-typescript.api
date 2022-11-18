import { Request, Response } from 'express';
import getAccount from '@modules/accounts/services/getAccount';
import { instanceToInstance } from 'class-transformer';

class getAccountController {
  public async execute(req: Request, res: Response) {
    const { id } = req.user;
    const account = await getAccount.execute(id);

    return res.json(instanceToInstance(account));
  }
}

export default new getAccountController();
