import {BaseFilterDto} from './base-filter-dto';

export class ParaclinicChildFilterDto extends BaseFilterDto {
  paraclinicChildId: number;
  paraclinicChildName: string;
  isDisabled: boolean;
}
