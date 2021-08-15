export class PatientReceptionServiceDto {
  id: number;
  receptionId: number;
  receptionCode: string;
  serviceID: number;
  serviceName: string;
  indexQuantity: number;
  freeRate: number;
  insuranceRate: number;
  insuranceShareRate: number;
  patientShareRate: number;
  outOfRate: number;
  iSFree: boolean;
  iSNC: boolean;
}
