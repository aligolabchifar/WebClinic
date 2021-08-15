import { Injectable } from '@angular/core';
import {BaseMemberPanelService} from '../../config/base-member-panel.service';
import {BaseServiceFilterDto} from '../../../model/filter/base-service-filter-dto';
import {Observable, Subject} from 'rxjs';
import {ResultListDto} from '../../general/result-list-dto';
import {BaseServiceListModelDto} from '../../../model/Base/BaseService/base-service-list-model-dto';
import {BaseServiceGroupListModelDto} from '../../../model/Base/BaseService/base-service-group-list-model-dto';
import {BaseServiceGroupFilterDto} from '../../../model/filter/base-service-group-filter-dto';
import {ReceptionListReceptionServiceModelDto} from '../../../model/Data/Reception/reception-list-reception-service-model-dto';
import {ResultObject} from '../../general/result-object';
import {BaseServiceGroupDto} from '../../../model/Base/BaseService/base-service-group-dto';
import {BaseServiceGroupModelDto} from '../../../model/Base/BaseService/base-service-group-model-dto';
import {BaseServiceGroupListTotalModelDto} from '../../../model/Base/BaseService/base-service-group-list-total-model-dto';
import {BaseServiceGroupListFullModelDto} from '../../../model/Base/BaseService/base-service-group-list-full-model-dto';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceGroupService  extends BaseMemberPanelService{

  public subjectNewServiceGroup = new Subject<any>();
  public subjectRefereshServiceGroup = new Subject<any>();

  getAllBaseServiceGroup(filters: BaseServiceGroupFilterDto): Observable<ResultListDto<BaseServiceGroupListModelDto>> {
    return this.http.post<ResultListDto<BaseServiceGroupListModelDto>>(this.baseServiceUrl + 'baseServiceGroup/getAllBaseServiceGroup', filters);
  }

  createBaseServiceGroup(baseServiceGroupDto: BaseServiceGroupModelDto): Observable<ResultObject<BaseServiceGroupModelDto>> {
    return this.http.post<ResultObject<BaseServiceGroupModelDto>>(this.baseServiceUrl + 'baseServiceGroup/createServiceGroups', baseServiceGroupDto);
  }



  getServiceGroupByIdQuery(filters: BaseServiceGroupFilterDto): Observable<ResultListDto<BaseServiceGroupListModelDto>> {
    return this.http.post<ResultListDto<BaseServiceGroupListModelDto>>(this.baseServiceUrl + 'baseServiceGroup/getServiceGroupByIdQuery', filters);
  }



  getAllBaseServiceGroupTotal(filters: BaseServiceGroupFilterDto): Observable<ResultListDto<BaseServiceGroupListTotalModelDto>> {
    return this.http.post<ResultListDto<BaseServiceGroupListTotalModelDto>>(this.baseServiceUrl + 'baseServiceGroup/getAllBaseServiceGroupTotal', filters);
  }



  getAllBaseServiceGroupFull(filters: BaseServiceGroupFilterDto): Observable<ResultListDto<BaseServiceGroupListFullModelDto>> {
    return this.http.post<ResultListDto<BaseServiceGroupListFullModelDto>>(this.baseServiceUrl + 'baseServiceGroup/getAllBaseServiceGroupFull', filters);
  }



}
