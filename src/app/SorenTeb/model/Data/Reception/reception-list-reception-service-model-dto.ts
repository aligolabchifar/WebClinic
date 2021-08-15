import {ReceptionServiceModelByIdModelDto} from './reception-service-model-by-id-model-dto';
import {PatientReceptionServiceDto} from './patient-reception-service-dto';

export class ReceptionListReceptionServiceModelDto {
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
  insuranceBookNumber: number;
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
  updateUserId: number;
  baseBeneficiaryId: number;
  patientStatus: number;
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


  paraclinicChildName: string;
  sexName: string;
  ageTypeName: string;
  insuranceName: string;
  iSDisabledDesc: string;
  beneficiaryFirstName: string;
  beneficiaryLastName: string;
  fullBeneficiaryName: string;
  beneficiaryGroupName: string;
  beneficiarySpecialName: string;


  receptionServiceModelByIdModel: Array<PatientReceptionServiceDto>;
}
