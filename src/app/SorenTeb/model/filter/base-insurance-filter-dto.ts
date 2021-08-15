import {BaseFilterDto} from './base-filter-dto';

export class BaseInsuranceFilterDto extends BaseFilterDto {
  insuranceId: number;
  insuranceName: string;
  baseParaclinicList: Array<number>;
  baseParaclinicChildId: number;
}
