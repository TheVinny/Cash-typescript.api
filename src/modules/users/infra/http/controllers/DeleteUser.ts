import { Request, Response } from 'express';
import DeleteUser from '@modules/users/services/DeleteUser';
import { container } from 'tsyringe';

class DeleteUserController {
  public async execute(req: Request, res: Response) {
    const { id } = req.user;

    const deleteuser = container.resolve(DeleteUser);

    await deleteuser.execute(id);

    res.status(204).json();
  }
}

export default new DeleteUserController();
