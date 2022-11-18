import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import Transfer from '../../../services/Transfer';

class TransferController {
  async execute(req: Request, res: Response): Promise<Response> {
    const { username, value } = req.body;
    const { id } = req.user;
    const transfer = await Transfer.execute({ value, username, id });

    return res.json(instanceToInstance(transfer));
  }
}
export default new TransferController();
