import {Injectable} from '@angular/core';
import {BaseMemberPanelService} from '../../config/base-member-panel.service';
import {Observable, Subject} from 'rxjs';
import {ReceptionDto} from '../../../model/Data/Reception/reception-dto';
import {ResultObject} from '../../general/result-object';
import {ResultListDto} from '../../general/result-list-dto';
import {ReceptionModelByIdModelDto} from '../../../model/Data/Reception/reception-model-by-id-model-dto';
import {ReceptionFilterDto} from '../../../model/filter/reception-filter-dto';
import {ReceptionListReceptionServiceModelDto} from '../../../model/Data/Reception/reception-list-reception-service-model-dto';
import {BaseServiceRoutinFilterDto} from '../../../model/filter/base-service-routin-filter-dto';
import {BaseServiceRoutinDetailListModelDto} from '../../../model/Base/BaseService/base-service-routin-detail-list-model-dto';
import {ReceptionListReceptionListModelDto} from '../../../model/Data/Reception/reception-list-reception-list-model-dto';

@Injectable({
  providedIn: 'root'
})
export class ReceptionService extends BaseMemberPanelService {
  public subjectReception = new Subject<any>();

  createReception(receptionDto: ReceptionListReceptionServiceModelDto): Observable<ResultObject<ReceptionListReceptionServiceModelDto>> {
    return this.http.post<ResultObject<ReceptionListReceptionServiceModelDto>>(this.baseServiceUrl + 'reception/createReception', receptionDto);
  }


  getReceptionByIdQuery(filters: ReceptionFilterDto): Observable<ResultListDto<ReceptionListReceptionServiceModelDto>> {
    return this.http.post<ResultListDto<ReceptionListReceptionServiceModelDto>>(this.baseServiceUrl + 'reception/getReceptionByIdQuery', filters);
  }

  getAllReceptionList(filters: ReceptionFilterDto): Observable<ResultListDto<ReceptionListReceptionListModelDto>> {
    return this.http.post<ResultListDto<ReceptionListReceptionListModelDto>>(this.baseServiceUrl + 'reception/getAllReceptionList', filters);
  }







}
