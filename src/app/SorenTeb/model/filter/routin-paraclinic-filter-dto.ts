import {BaseFilterDto} from './base-filter-dto';

export class RoutinParaclinicFilterDto extends BaseFilterDto {
  routinId: number;
  routinName: string;
  paraclinicChildId: number;
}
