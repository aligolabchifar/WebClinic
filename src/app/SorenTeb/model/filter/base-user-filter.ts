import {BaseFilterDto} from './base-filter-dto';

export class BaseUserFilter extends BaseFilterDto{
  userId: number;
  userName: string;
}
