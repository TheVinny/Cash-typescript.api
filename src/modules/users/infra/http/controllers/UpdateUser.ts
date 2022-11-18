import { Request, Response } from 'express';
import UpdateUser from '@modules/users/services/UpdateUser';

class UpdateUserController {
  async execute(req: Request, res: Response): Promise<Response> {
    const { username, password, old_password } = req.body;
    const { id } = req.user;

    const user = await UpdateUser.execute({
      id,
      password,
      username,
      old_password,
    });

    return res.status(200).json(user);
  }
}

export default new UpdateUserController();
