import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {BaseBeneficiarySpecialFilterDto} from '../../../model/filter/base-beneficiary-special-filter-dto';
import {ResultListDto} from '../../general/result-list-dto';
import {BaseBeneficiarySpecialModelDto} from '../../../model/Base/Specials/base-beneficiary-special-model-dto';
import {ResultObject} from '../../general/result-object';
import {BaseMemberPanelService} from '../../config/base-member-panel.service';
import {BaseBeneficiaryGroupsFilterDto} from '../../../model/filter/base-beneficiary-groups-filter-dto';
import {BaseBeneficiaryGroupsListModelDto} from '../../../model/Base/BeneficiaryGroups/base-beneficiary-groups-list-model-dto';

@Injectable({
  providedIn: 'root'
})
export class BaseBeneficiaryGroupsService extends BaseMemberPanelService{

  public subjectNewBaseBeneficiaryGroup = new Subject<any>();
  public subjectRefereshBaseBeneficiaryGroup = new Subject<any>();

  getAllBaseBeneficiaryGroups(filters: BaseBeneficiaryGroupsFilterDto): Observable<ResultListDto<BaseBeneficiaryGroupsListModelDto>> {
    return this.http.post<ResultListDto<BaseBeneficiaryGroupsListModelDto>>(this.baseServiceUrl + 'baseBeneficiaryGroups/getAllBaseBeneficiaryGroups', filters);
  }

  createtBeneficiaryGroups(baseBeneficiaryGroupsListModelDto: BaseBeneficiaryGroupsListModelDto): Observable<ResultObject<BaseBeneficiaryGroupsListModelDto>> {
    return this.http.post<ResultObject<BaseBeneficiaryGroupsListModelDto>>(this.baseServiceUrl + 'baseBeneficiaryGroups/createtBeneficiaryGroups', baseBeneficiaryGroupsListModelDto);
  }
}
