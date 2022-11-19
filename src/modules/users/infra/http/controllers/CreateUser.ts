import { Request, Response } from 'express';
import CreateUser from '@modules/users/services/CreateUser';
import { instanceToInstance } from 'class-transformer';
import UserRepository from '@modules/users/repository/userRepository';

class CreateUserController {
  async execute(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const custom = new UserRepository();

    const createuser = new CreateUser(custom);

    const user = await createuser.execute({ password, username });

    return res.json(instanceToInstance(user));
  }
}

export default new CreateUserController();
