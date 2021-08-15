import { Injectable } from '@angular/core';
import {BaseMemberPanelService} from '../../config/base-member-panel.service';
import {Observable, Subject} from 'rxjs';
import {CaliforniaFilterDto} from '../../../model/filter/california-filter-dto';
import {ResultListDto} from '../../general/result-list-dto';
import {BaseCaliforniaListModelDto} from '../../../model/Base/California/base-california-list-model-dto';
import {BaseServiceGroupRelationListModelDto} from '../../../model/Base/BaseService/base-service-group-relation-list-model-dto';
import {BaseServiceGroupRelationFilterDto} from '../../../model/filter/base-service-group-relation-filter-dto';
import {BaseServiceGroupModelDto} from '../../../model/Base/BaseService/base-service-group-model-dto';
import {ResultObject} from '../../general/result-object';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceGroupRelationService extends BaseMemberPanelService {

  public subjectNewBaseServiceGroupRelation = new Subject<any>();
  public subjectRefereshBaseServiceGroupRelation = new Subject<any>();


  getAllBaseServiceGroupRelation(filters: BaseServiceGroupRelationFilterDto): Observable<ResultListDto<BaseServiceGroupRelationListModelDto>> {
    return this.http.post<ResultListDto<BaseServiceGroupRelationListModelDto>>(this.baseServiceUrl + 'baseServiceGroupRelation/getAllBaseServiceGroupRelation', filters);
  }


  createServiceGroupRelation(baseServiceGroupRelationListModelDto: BaseServiceGroupRelationListModelDto): Observable<ResultObject<BaseServiceGroupRelationListModelDto>> {
    return this.http.post<ResultObject<BaseServiceGroupRelationListModelDto>>(this.baseServiceUrl + 'baseServiceGroupRelation/createServiceGroupRelation', baseServiceGroupRelationListModelDto);
  }



}
