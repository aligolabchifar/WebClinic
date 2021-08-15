import {BaseFilterDto} from './base-filter-dto';

export class BaseBeneficiarySpecialFilterDto extends BaseFilterDto {
  id: number;
  beneficiarySpecialName: string;
  isDisabled: boolean;
}
