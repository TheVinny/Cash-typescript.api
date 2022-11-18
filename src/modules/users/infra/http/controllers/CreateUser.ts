import { Request, Response } from 'express';
import CreateUser from '@modules/users/services/CreateUser';
import { instanceToInstance } from 'class-transformer';

class CreateUserController {
  async execute(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const user = await CreateUser.execute({ password, username });

    return res.json(instanceToInstance(user));
  }
}

export default new CreateUserController();
