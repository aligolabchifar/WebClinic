import { Injectable } from '@angular/core';
import {BaseMemberPanelService} from '../../config/base-member-panel.service';
import {Observable, Subject} from 'rxjs';
import {BaseServiceGroupModelDto} from '../../../model/Base/BaseService/base-service-group-model-dto';
import {ResultObject} from '../../general/result-object';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceGroupParaclinicChildService extends BaseMemberPanelService {

  public subjectNewServiceGroupParaclinic = new Subject<any>();
  public subjectRefereshServiceGroupParaclinic = new Subject<any>();


  createServiceGroupParaclinic(baseServiceGroupDto: BaseServiceGroupModelDto): Observable<ResultObject<BaseServiceGroupModelDto>> {
    return this.http.post<ResultObject<BaseServiceGroupModelDto>>(this.baseServiceUrl + 'baseServiceGroupParaclinicChild/createServiceGroupParaclinic', baseServiceGroupDto);
  }


  deleteServiceGroupParaclinic(baseServiceGroupDto: BaseServiceGroupModelDto): Observable<ResultObject<BaseServiceGroupModelDto>> {
    return this.http.post<ResultObject<BaseServiceGroupModelDto>>(this.baseServiceUrl + 'baseServiceGroupParaclinicChild/deleteServiceGroupParaclinic', baseServiceGroupDto);
  }


}
