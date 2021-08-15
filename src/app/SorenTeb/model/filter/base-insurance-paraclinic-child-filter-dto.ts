import {BaseFilterDto} from './base-filter-dto';
import {number} from 'ngx-custom-validators/src/app/number/validator';

export class BaseInsuranceParaclinicChildFilterDto extends BaseFilterDto {
 insuranceId: number;
insuranceName: string;
baseParaclinicChildId: number;
}
