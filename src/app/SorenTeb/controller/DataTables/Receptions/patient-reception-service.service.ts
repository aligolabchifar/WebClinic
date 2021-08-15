import { Injectable } from '@angular/core';
import {BaseMemberPanelService} from '../../config/base-member-panel.service';
import {Observable, Subject} from 'rxjs';
import {ReceptionDto} from '../../../model/Data/Reception/reception-dto';
import {ResultObject} from '../../general/result-object';
import {PatientReceptionServiceDto} from '../../../model/Data/Reception/patient-reception-service-dto';
import {ReceptionFilterDto} from '../../../model/filter/reception-filter-dto';
import {ResultListDto} from '../../general/result-list-dto';
import {ReceptionModelByIdModelDto} from '../../../model/Data/Reception/reception-model-by-id-model-dto';
import {ReceptionServiceModelByIdModelDto} from '../../../model/Data/Reception/reception-service-model-by-id-model-dto';
import {PatientReceptionServiceFilterDto} from '../../../model/filter/patient-reception-service-filter-dto';
import {BaseInsuranceFilterDto} from '../../../model/filter/base-insurance-filter-dto';
import {BaseInsuranceListModelDto} from '../../../model/Base/Insurance/base-insurance-list-model-dto';
import {ReceptionListReceptionServiceModelDto} from '../../../model/Data/Reception/reception-list-reception-service-model-dto';

@Injectable({
  providedIn: 'root'
})
export class PatientReceptionServiceService extends BaseMemberPanelService {

  public subjectReceptionService = new Subject<any>();

  createPatientReceptionService(receptionDto: PatientReceptionServiceDto): Observable<ResultObject<PatientReceptionServiceDto>> {
    return this.http.post<ResultObject<PatientReceptionServiceDto>>(this.baseServiceUrl + 'patientReceptionService/createPatientReceptionService', receptionDto);
  }


  getPatientReceptionServiceByIdQuery(filters: PatientReceptionServiceFilterDto): Observable<ResultListDto<ReceptionServiceModelByIdModelDto>> {
    return this.http.post<ResultListDto<ReceptionServiceModelByIdModelDto>>(this.baseServiceUrl + 'patientReceptionService/getPatientReceptionServiceByIdQuery', filters);
  }


  getAllReceptionServiceByReceptionId(filters: ReceptionFilterDto): Observable<ResultListDto<ReceptionServiceModelByIdModelDto>> {
    return this.http.post<ResultListDto<ReceptionServiceModelByIdModelDto>>(this.baseServiceUrl + 'patientReceptionService/getAllReceptionServiceByReceptionId', filters);
  }


  setPatientReceptionService(filters: ReceptionFilterDto): Observable<ResultObject<PatientReceptionServiceDto>> {
    return this.http.post<ResultObject<PatientReceptionServiceDto>>(this.baseServiceUrl + 'patientReceptionService/setPatientReceptionService', filters);
  }

  DeletePatientReceptionService(filters: ReceptionFilterDto): Observable<ResultObject<PatientReceptionServiceDto>> {
    return this.http.post<ResultObject<PatientReceptionServiceDto>>(this.baseServiceUrl + 'patientReceptionService/DeletePatientReceptionService', filters);
  }

}
