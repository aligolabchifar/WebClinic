import { Injectable } from '@angular/core';
import {BaseMemberPanelService} from '../../config/base-member-panel.service';
import {Observable, Subject} from 'rxjs';
import {BaseServiceGroupFilterDto} from '../../../model/filter/base-service-group-filter-dto';
import {ResultListDto} from '../../general/result-list-dto';
import {BaseServiceGroupListModelDto} from '../../../model/Base/BaseService/base-service-group-list-model-dto';
import {BaseBeneficiarySpecialModelDto} from '../../../model/Base/Specials/base-beneficiary-special-model-dto';
import {BaseBeneficiarySpecialFilterDto} from '../../../model/filter/base-beneficiary-special-filter-dto';
import {BaseServiceGroupModelDto} from '../../../model/Base/BaseService/base-service-group-model-dto';
import {ResultObject} from '../../general/result-object';

@Injectable({
  providedIn: 'root'
})
export class BaseBeneficiarySpecialService extends BaseMemberPanelService {

  public subjectNewBaseBeneficiarySpecial = new Subject<any>();
  public subjectRefereshBaseBeneficiarySpecial = new Subject<any>();


  getAllBaseBeneficiarySpecial(filters: BaseBeneficiarySpecialFilterDto): Observable<ResultListDto<BaseBeneficiarySpecialModelDto>> {
    return this.http.post<ResultListDto<BaseBeneficiarySpecialModelDto>>(this.baseServiceUrl + 'baseBeneficiarySpecial/getAllBaseBeneficiarySpecial', filters);
  }

  createtBeneficiarySpecial(baseBeneficiarySpecialModelDto: BaseBeneficiarySpecialModelDto): Observable<ResultObject<BaseBeneficiarySpecialModelDto>> {
    return this.http.post<ResultObject<BaseBeneficiarySpecialModelDto>>(this.baseServiceUrl + 'baseBeneficiarySpecial/createtBeneficiarySpecial', baseBeneficiarySpecialModelDto);
  }


}
