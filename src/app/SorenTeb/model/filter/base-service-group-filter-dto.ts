import {BaseFilterDto} from './base-filter-dto';
import {number} from 'ngx-custom-validators/src/app/number/validator';

export class BaseServiceGroupFilterDto extends BaseFilterDto {
  groupId: number;
  groupName: string;
  baseParaclinicChildId: number;
  baseBeneficiaryId: number;
  paraclinicChildName: string;
}
