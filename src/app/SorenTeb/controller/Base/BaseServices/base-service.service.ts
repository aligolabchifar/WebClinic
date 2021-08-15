import { Injectable } from '@angular/core';
import {BaseMemberPanelService} from '../../config/base-member-panel.service';
import {BeneficiaryFilterDto} from '../../../model/filter/beneficiary-filter-dto';
import {Observable, Subject} from 'rxjs';
import {ResultListDto} from '../../general/result-list-dto';
import {BaseBeneficiaryListModelDto} from '../../../model/Base/Beneficiary/base-beneficiary-list-model-dto';
import {BaseServiceListModelDto} from '../../../model/Base/BaseService/base-service-list-model-dto';
import {BaseServiceFilterDto} from '../../../model/filter/base-service-filter-dto';
import {PatientReceptionServiceFilterDto} from '../../../model/filter/patient-reception-service-filter-dto';
import {ReceptionServiceModelByIdModelDto} from '../../../model/Data/Reception/reception-service-model-by-id-model-dto';
import {BaseServiceRoutinDetailListModelDto} from '../../../model/Base/BaseService/base-service-routin-detail-list-model-dto';
import {BaseServiceRoutinFilterDto} from '../../../model/filter/base-service-routin-filter-dto';
import {BaseServiceRoutinDetailMainListModelDto} from '../../../model/Base/BaseService/base-service-routin-detail-main-list-model-dto';
import {BaseServiceFirstListModelDto} from '../../../model/Base/BaseService/base-service-first-list-model-dto';
import {ResultObject} from '../../general/result-object';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService extends BaseMemberPanelService {

  public subjectNewBaseService = new Subject<any>();
  public subjectRefereshBaseService = new Subject<any>();

  getAllBaseService(filters: BaseServiceFilterDto): Observable<ResultListDto<BaseServiceListModelDto>> {
    return this.http.post<ResultListDto<BaseServiceListModelDto>>(this.baseServiceUrl + 'baseService/getAllBaseService', filters);
  }


  getAllBaseRoutinList(filters: BaseServiceRoutinFilterDto): Observable<ResultListDto<BaseServiceRoutinDetailListModelDto>> {
    return this.http.post<ResultListDto<BaseServiceRoutinDetailListModelDto>>(this.baseServiceUrl + 'baseService/getAllBaseRoutinList', filters);
  }


  getAllBaseRoutinListMain(filters: BaseServiceRoutinFilterDto): Observable<ResultListDto<BaseServiceRoutinDetailMainListModelDto>> {
    return this.http.post<ResultListDto<BaseServiceRoutinDetailMainListModelDto>>(this.baseServiceUrl + 'baseService/getAllBaseRoutinListMain', filters);
  }


  getAllBaseServiceFirst(filters: BaseServiceFilterDto): Observable<ResultListDto<BaseServiceFirstListModelDto>> {
    return this.http.post<ResultListDto<BaseServiceFirstListModelDto>>(this.baseServiceUrl + 'baseService/getAllBaseServiceFirst', filters);
  }


  createtBaseService(baseServiceFirstListModelDto: BaseServiceFirstListModelDto): Observable<ResultObject<BaseServiceFirstListModelDto>> {
    return this.http.post<ResultObject<BaseServiceFirstListModelDto>>(this.baseServiceUrl + 'baseService/createtBaseService', baseServiceFirstListModelDto);
  }


}
