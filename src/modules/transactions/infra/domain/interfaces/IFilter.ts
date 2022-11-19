import { EFilter } from './EFilter';

export interface IFilter {
  id: string;
  date: string;
  filter: 'send' | 'received';
}
