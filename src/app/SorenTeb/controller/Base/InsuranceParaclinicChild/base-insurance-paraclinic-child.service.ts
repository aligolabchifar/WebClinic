import { Injectable } from '@angular/core';
import {BaseMemberPanelService} from '../../config/base-member-panel.service';
import {Observable, Subject} from 'rxjs';
import {ResultListDto} from '../../general/result-list-dto';
import {BaseCertificateTypeListModelDto} from '../../../model/Base/Certificate/base-certificate-type-list-model-dto';
import {BaseInsuranceParaclinicChildFilterDto} from '../../../model/filter/base-insurance-paraclinic-child-filter-dto';
import {BaseInsuranceParaclinicChildModelDto} from '../../../model/Base/InsuranceParaclinicChild/base-insurance-paraclinic-child-model-dto';
import {CertificateFilterDto} from '../../../model/filter/certificate-filter-dto';
import {ResultObject} from '../../general/result-object';

@Injectable({
  providedIn: 'root'
})
export class BaseInsuranceParaclinicChildService  extends BaseMemberPanelService {

  public subjectNewInsuranceParaclinicChild = new Subject<any>();
  public subjectRefereshInsuranceParaclinicChild = new Subject<any>();

  getAllBaseInsuranceCertificate(filters: BaseInsuranceParaclinicChildFilterDto): Observable<ResultListDto<BaseInsuranceParaclinicChildModelDto>> {
    return this.http.post<ResultListDto<BaseInsuranceParaclinicChildModelDto>>(this.baseServiceUrl + 'baseInsuranceParaclinicChild/getAllBaseInsuranceCertificate', filters);
  }

  createtBaseInsuranceCertificate(filters: BaseInsuranceParaclinicChildModelDto): Observable<ResultObject<BaseInsuranceParaclinicChildModelDto>> {
    return this.http.post<ResultObject<BaseInsuranceParaclinicChildModelDto>>(this.baseServiceUrl + 'baseInsuranceParaclinicChild/createtBaseInsuranceCertificate', filters);
  }




}
