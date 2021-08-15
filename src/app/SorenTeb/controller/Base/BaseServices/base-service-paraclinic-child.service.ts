import { Injectable } from '@angular/core';
import {BaseMemberPanelService} from '../../config/base-member-panel.service';
import {Observable, Subject} from 'rxjs';
import {ResultListDto} from '../../general/result-list-dto';
import {BaseServiceRoutinDetailListModelDto} from '../../../model/Base/BaseService/base-service-routin-detail-list-model-dto';
import {BaseServiceParaclinicFilterDto} from '../../../model/filter/base-service-paraclinic-filter-dto';
import {BaseServiceParaclinicChildListModelDto} from '../../../model/Base/ServiceParaclinic/base-service-paraclinic-child-list-model-dto';
import {CaliforniaFilterDto} from '../../../model/filter/california-filter-dto';
import {BaseCaliforniaListModelDto} from '../../../model/Base/California/base-california-list-model-dto';
import {BaseServiceFirstListModelDto} from '../../../model/Base/BaseService/base-service-first-list-model-dto';
import {ResultObject} from '../../general/result-object';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceParaclinicChildService extends BaseMemberPanelService {

  public subjectNewBaseServiceParaclinicChild = new Subject<any>();
  public subjectRefereshBaseServiceParaclinicChild = new Subject<any>();

  getAllBaseServiceParaclinicChild(filters: BaseServiceParaclinicFilterDto): Observable<ResultListDto<BaseServiceParaclinicChildListModelDto>> {
    return this.http.post<ResultListDto<BaseServiceParaclinicChildListModelDto>>(this.baseServiceUrl + 'baseServiceParaclinicChild/getAllBaseServiceParaclinicChild', filters);
  }

  getAllBaseCaliforniaListQuery(filters: CaliforniaFilterDto): Observable<ResultListDto<BaseCaliforniaListModelDto>> {
    return this.http.post<ResultListDto<BaseCaliforniaListModelDto>>(this.baseServiceUrl + 'baseServiceParaclinicChild/getAllBaseCaliforniaListQuery', filters);
  }

  createtBaseServiceParaclinicChild(baseServiceFirstListModelDto: BaseServiceParaclinicChildListModelDto): Observable<ResultObject<BaseServiceFirstListModelDto>> {
    return this.http.post<ResultObject<BaseServiceFirstListModelDto>>(this.baseServiceUrl + 'baseServiceParaclinicChild/createtBaseServiceParaclinicChild', baseServiceFirstListModelDto);
  }


}
