import {ReceptionServiceModelByIdModelDto} from './reception-service-model-by-id-model-dto';

export class ReceptionDto {
  id: number;
  receptionCode: string;
  documentCode: string;
  baseParaclinicChildId: number;
  receptionDate: string;
  receptionTime: string;
  firstName: string;
  lastName: string;
  fatherName: string;
  sex: number;
  age: number;
  ageType: number;
  birthDate: string;
  rankNo: number;
  birthLocation: number;
  tel: string;
  mobile: string;
  patientAddress: string;
  insuranceCode: number;
  insurancePercent: number;
  insuranceVersionDate: string;
  insuranceBookNumber: string;
  insurancePageNumber: number;
  insuranceExpireDate: string;
  iSDisabled: boolean;
  nationNumber: string;
  insuranceRate: number;
  insuranceShareRate: number;
  patientShareRate: number;
  freeRate: number;
  mustPay: number;
  outOfRate: number;
  discountRate: number;
  paymentRate: number;
  createUserId: number;
  UpdateUserId: number;
  BeneficiaryID: number;
  PatientStatus: number;
  description: string;
  introducation: string;
  isDM: boolean;
  isFH: boolean;
  isHTN: boolean;
  isHIP: boolean;
  isSM: boolean;
  isOther: boolean;
  queueNumber: number;
  introduction2: number;
  createDate: string;
  createTime: string;
  updateDate: string;
  updateTime: string;
  baseBeneficiaryId: number;
}
