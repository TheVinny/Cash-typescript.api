import { Request, Response } from 'express';
import DeleteUser from '@modules/users/services/DeleteUser';

class DeleteUserController {
  public async execute(req: Request, res: Response) {
    const { id } = req.user;

    await DeleteUser.execute(id);

    res.status(204).json();
  }
}

export default new DeleteUserController();
