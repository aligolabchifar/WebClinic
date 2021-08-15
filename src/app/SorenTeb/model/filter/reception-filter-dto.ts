import {BaseFilterDto} from './base-filter-dto';
import {ReceptionServiceModelByIdModelDto} from '../Data/Reception/reception-service-model-by-id-model-dto';

export class ReceptionFilterDto extends BaseFilterDto {
  receptionId: number;
  userId: number;
  firstName: string;
  lastName: string;
  fullName: string;
  fromReceptionDate: string;
  toReceptionDate: string;
  receptionCode: string;
  documentCode: string;
  nationNumber: string;
  baseBeneficiaryId: number;
  patientStatus: number;
  tel: string;
  mobile: string;
  iSdisabled: boolean;
 serviceId: number;
 insuranceId: number;
 paraclinicChildId: number;
  receptionServiceId: number;
  receptionServiceModelByIdModelDto: Array<ReceptionServiceModelByIdModelDto>;
}
