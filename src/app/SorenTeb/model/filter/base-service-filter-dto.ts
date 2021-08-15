import {BaseFilterDto} from './base-filter-dto';


export class BaseServiceFilterDto extends BaseFilterDto {
  baseServiceId: number;
  serviceGroupId: number;
  groupName: string;
  baseParaclinicChildId: number;
  serviceName: string;
  baseBeneficiaryId: number;
}
