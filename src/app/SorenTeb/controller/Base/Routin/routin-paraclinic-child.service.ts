import { Injectable } from '@angular/core';
import {BaseMemberPanelService} from '../../config/base-member-panel.service';
import {Observable, Subject} from 'rxjs';
import {ResultListDto} from '../../general/result-list-dto';
import {RoutinParaclinicFilterDto} from '../../../model/filter/routin-paraclinic-filter-dto';
import {BaseServiceRoutinParaclinicChildListModelDto} from '../../../model/Base/Routin/base-service-routin-paraclinic-child-list-model-dto';
import {BaseRoutinListModelDto} from '../../../model/Base/Routin/base-routin-list-model-dto';
import {ResultObject} from '../../general/result-object';

@Injectable({
  providedIn: 'root'
})
export class RoutinParaclinicChildService extends BaseMemberPanelService {

  public subjectNewRoutinParaclinicChild = new Subject<any>();
  public subjectRefereshRoutinParaclinicChild = new Subject<any>();

  getAllRoutinParaclinicChild(filters: RoutinParaclinicFilterDto): Observable<ResultListDto<BaseServiceRoutinParaclinicChildListModelDto>> {
    return this.http.post<ResultListDto<BaseServiceRoutinParaclinicChildListModelDto>>(this.baseServiceUrl + 'routinParaclinicChild/getAllRoutinParaclinicChild', filters);
  }


  createtRoutinParaclinicChild(baseServiceRoutinParaclinicChildListModelDto: BaseServiceRoutinParaclinicChildListModelDto): Observable<ResultObject<BaseServiceRoutinParaclinicChildListModelDto>> {
    return this.http.post<ResultObject<BaseServiceRoutinParaclinicChildListModelDto>>(this.baseServiceUrl + 'routinParaclinicChild/createtRoutinParaclinicChild', baseServiceRoutinParaclinicChildListModelDto);
  }



}
