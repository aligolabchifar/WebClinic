import {BaseFilterDto} from './base-filter-dto';

export class PatientReceptionServiceFilterDto extends BaseFilterDto {
  serviceId: number;
  serviceName: string;
  indexQuantity: number;
  insuranceId: number;
  paraclinicChildId: number;
  franshiPercent: number;
  isFree: boolean;
  isNC: boolean;
}


