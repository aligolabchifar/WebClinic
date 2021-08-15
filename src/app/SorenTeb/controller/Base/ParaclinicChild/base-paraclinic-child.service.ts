import { Injectable } from '@angular/core';
import {BaseMemberPanelService} from '../../config/base-member-panel.service';
import {Observable, Subject} from 'rxjs';
import {BeneficiaryFilterDto} from '../../../model/filter/beneficiary-filter-dto';
import {ResultListDto} from '../../general/result-list-dto';
import {BaseBeneficiaryListModelDto} from '../../../model/Base/Beneficiary/base-beneficiary-list-model-dto';
import {BaseParaclinicChildDto} from '../../../model/Base/Paraclinic/base-paraclinic-child-dto';
import {ParaclinicChildFilterDto} from '../../../model/filter/paraclinic-child-filter-dto';
import {BaseParaclinicChildListModelDto} from '../../../model/Base/Paraclinic/base-paraclinic-child-list-model-dto';
import {ResultObject} from '../../general/result-object';

@Injectable({
  providedIn: 'root'
})
export class BaseParaclinicChildService extends BaseMemberPanelService {

  public subjectNewBaseParaclinicChild = new Subject<any>();
  public subjectRefereshBaseParaclinicChild = new Subject<any>();


  getAllParaclinicChild(filters: ParaclinicChildFilterDto): Observable<ResultListDto<BaseParaclinicChildDto>> {
    return this.http.post<ResultListDto<BaseParaclinicChildDto>>(this.baseServiceUrl + 'baseParaclinicChild/getAllParaclinicChild', filters);
  }
  getAllBaseParaclinicChildList(filters: ParaclinicChildFilterDto): Observable<ResultListDto<BaseParaclinicChildListModelDto>> {
    return this.http.post<ResultListDto<BaseParaclinicChildListModelDto>>(this.baseServiceUrl + 'baseParaclinicChild/getAllBaseParaclinicChildList', filters);
  }

  createtBaseParaclinicChild(baseParaclinicChildListModelDto: BaseParaclinicChildListModelDto): Observable<ResultObject<BaseParaclinicChildListModelDto>> {
    return this.http.post<ResultObject<BaseParaclinicChildListModelDto>>(this.baseServiceUrl + 'baseParaclinicChild/createtBaseParaclinicChild', baseParaclinicChildListModelDto);
  }


}
