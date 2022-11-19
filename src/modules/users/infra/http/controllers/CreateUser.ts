import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';
import CreateUser from '@modules/users/services/CreateUser';

class CreateUserController {
  async execute(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const createuser = container.resolve(CreateUser);

    const user = await createuser.execute({ password, username });

    return res.json(instanceToInstance(user));
  }
}

export default new CreateUserController();
