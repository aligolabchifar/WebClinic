import {BaseFilterDto} from './base-filter-dto';

export class BaseBeneficiaryGroupsFilterDto  extends BaseFilterDto {
  groupId: number;
  groupName: string;
  isDisabled: boolean;
}
