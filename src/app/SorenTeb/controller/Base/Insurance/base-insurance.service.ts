import { Injectable } from '@angular/core';
import {BaseMemberPanelService} from '../../config/base-member-panel.service';
import {Observable, Subject} from 'rxjs';
import {ResultListDto} from '../../general/result-list-dto';
import {BaseInsuranceListModelDto} from '../../../model/Base/Insurance/base-insurance-list-model-dto';
import {BaseInsuranceFilterDto} from '../../../model/filter/base-insurance-filter-dto';
import {BaseInsuranceDto} from '../../../model/Base/Insurance/base-insurance-dto';
import {ResultObject} from '../../general/result-object';

@Injectable({
  providedIn: 'root'
})
export class BaseInsuranceService extends BaseMemberPanelService {


  public subjectNewBaseInsurance = new Subject<any>();
  public subjectRefereshBaseInsurance = new Subject<any>();


  getAllBaseInsurance(filters: BaseInsuranceFilterDto): Observable<ResultListDto<BaseInsuranceListModelDto>> {
    return this.http.post<ResultListDto<BaseInsuranceListModelDto>>(this.baseServiceUrl + 'baseInsurance/getAllBaseInsurance', filters);
  }


  getAllBaseInsuranceFirst(filters: BaseInsuranceFilterDto): Observable<ResultListDto<BaseInsuranceDto>> {
    return this.http.post<ResultListDto<BaseInsuranceDto>>(this.baseServiceUrl + 'baseInsurance/getAllBaseInsuranceFirst', filters);
  }

  createtBaseInsurance(baseInsuranceFirst: BaseInsuranceDto): Observable<ResultObject<BaseInsuranceDto>> {
    return this.http.post<ResultObject<BaseInsuranceDto>>(this.baseServiceUrl + 'baseInsurance/createtBaseInsurance', baseInsuranceFirst);
  }



}

