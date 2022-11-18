import { Request, Response } from 'express';
import GetByFilter from '../../../services/GetByFilter';

class FilterController {
  async execute(req: Request, res: Response): Promise<Response> {
    const { date, filter } = req.body;
    const { id } = req.user;
    const transactions = await GetByFilter.execute({
      date,
      id,
      filter,
    });

    return res.json(transactions);
  }
}
export default new FilterController();
