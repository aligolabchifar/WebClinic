import {BaseParaclinicChildDto} from '../Base/Paraclinic/base-paraclinic-child-dto';
import {BaseFilterDto} from './base-filter-dto';

export class BeneficiaryFilterDto extends BaseFilterDto {
  beneficiaryId: number;
  beneficiaryName: string;
  baseParaclinicChildId: number;
  baseParaclinicChildIdStr: string;
  baseParaclinicList: Array<number>;
}
