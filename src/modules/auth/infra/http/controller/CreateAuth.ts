import CreateAuth from '@modules/auth/services/CreateAuth';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';

class CreateAuthController {
  public async execute(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const users = await CreateAuth.execute({ username, password });

    return res.json(instanceToInstance(users));
  }
}

export default new CreateAuthController();
