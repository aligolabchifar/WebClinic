import { Injectable } from '@angular/core';
import {BaseMemberPanelService} from '../../config/base-member-panel.service';
import {Observable, Subject} from 'rxjs';
import {BaseInsuranceFilterDto} from '../../../model/filter/base-insurance-filter-dto';
import {ResultListDto} from '../../general/result-list-dto';
import {BaseInsuranceListModelDto} from '../../../model/Base/Insurance/base-insurance-list-model-dto';
import {BaseCertificateTypeListModelDto} from '../../../model/Base/Certificate/base-certificate-type-list-model-dto';
import {CertificateFilterDto} from '../../../model/filter/certificate-filter-dto';
import {ResultObject} from '../../general/result-object';
import {ReceptionFilterDto} from '../../../model/filter/reception-filter-dto';
import {PatientReceptionServiceDto} from '../../../model/Data/Reception/patient-reception-service-dto';
import {BaseCertificateTypeFirstListModelDto} from '../../../model/Base/Certificate/base-certificate-type-first-list-model-dto';

@Injectable({
  providedIn: 'root'
})
export class BaseCertificateTypeService extends BaseMemberPanelService{

  public subjectNewBaseCertificate = new Subject<any>();
  public subjectRefereshBaseCertificate = new Subject<any>();



  getAllBaseCertificateType(filters: CertificateFilterDto): Observable<ResultListDto<BaseCertificateTypeListModelDto>> {
    return this.http.post<ResultListDto<BaseCertificateTypeListModelDto>>(this.baseServiceUrl + 'baseCertificateType/getAllBaseCertificateType', filters);
  }


  operationCalculatedInsertIntoCertificate(filters: CertificateFilterDto) {
    return this.http.post<ResultObject<number>>(this.baseServiceUrl + 'baseCertificateType/operationCalculatedInsertIntoCertificate/' , filters);
  }


  setCertificateDetail(filters: CertificateFilterDto): Observable<ResultObject<BaseCertificateTypeListModelDto>> {
    return this.http.post<ResultObject<BaseCertificateTypeListModelDto>>(this.baseServiceUrl + 'baseCertificateType/setCertificateDetail', filters);
  }



  getAllBaseCertificateTypeFirst(filters: CertificateFilterDto): Observable<ResultListDto<BaseCertificateTypeFirstListModelDto>> {
    return this.http.post<ResultListDto<BaseCertificateTypeFirstListModelDto>>(this.baseServiceUrl + 'baseCertificateType/getAllBaseCertificateTypeFirst', filters);
  }


}
