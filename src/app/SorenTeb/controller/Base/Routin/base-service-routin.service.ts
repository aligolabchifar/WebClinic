import { Injectable } from '@angular/core';
import {BaseMemberPanelService} from '../../config/base-member-panel.service';
import {Observable, Subject} from 'rxjs';
import {ResultListDto} from '../../general/result-list-dto';
import {BaseRoutinFilterDto} from '../../../model/filter/base-routin-filter-dto';
import {BaseRoutinListModelDto} from '../../../model/Base/Routin/base-routin-list-model-dto';
import {BaseBeneficiaryListModelDto} from '../../../model/Base/Beneficiary/base-beneficiary-list-model-dto';
import {ResultObject} from '../../general/result-object';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceRoutinService extends BaseMemberPanelService  {

  public subjectNewBaseServiceRoutin = new Subject<any>();
  public subjectRefereshBaseServiceRoutin = new Subject<any>();

  getAllBaseServiceRoutin(filters: BaseRoutinFilterDto): Observable<ResultListDto<BaseRoutinListModelDto>> {
    return this.http.post<ResultListDto<BaseRoutinListModelDto>>(this.baseServiceUrl + 'baseServiceRoutin/getAllBaseServiceRoutin', filters);
  }

  createtBaseServiceRoutin(baseRoutinListModelDto: BaseRoutinListModelDto): Observable<ResultObject<BaseRoutinListModelDto>> {
    return this.http.post<ResultObject<BaseRoutinListModelDto>>(this.baseServiceUrl + 'baseServiceRoutin/createtBaseServiceRoutin', baseRoutinListModelDto);
  }


}
