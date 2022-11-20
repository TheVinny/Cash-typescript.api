import { Request, Response } from 'express';
import getAccount from '@modules/accounts/services/getAccount';
import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';

class getAccountController {
  public async execute(req: Request, res: Response) {
    const { id } = req.user;

    const accountContainer = container.resolve(getAccount);

    const account = await accountContainer.execute(id);

    return res.json(instanceToInstance(account));
  }
}

export default new getAccountController();
