import { Injectable } from '@angular/core';
import {BaseMemberPanelService} from '../../config/base-member-panel.service';
import {Observable, Subject} from 'rxjs';
import {BaseBeneficiaryGroupsFilterDto} from '../../../model/filter/base-beneficiary-groups-filter-dto';
import {ResultListDto} from '../../general/result-list-dto';
import {BaseBeneficiaryGroupsListModelDto} from '../../../model/Base/BeneficiaryGroups/base-beneficiary-groups-list-model-dto';
import {BaseBeneficiaryGroupServiceListModelDto} from '../../../model/Base/BeneficiaryGroups/base-beneficiary-group-service-list-model-dto';
import {ResultObject} from '../../general/result-object';

@Injectable({
  providedIn: 'root'
})
export class BaseBeneficiaryGroupServiceService extends BaseMemberPanelService {

  public subjectNewBaseBeneficiaryGroupService = new Subject<any>();
  public subjectRefereshBaseBeneficiaryGroupService = new Subject<any>();

  getAllBaseBeneficiaryGroupService(filters: BaseBeneficiaryGroupsFilterDto): Observable<ResultListDto<BaseBeneficiaryGroupServiceListModelDto>> {
    return this.http.post<ResultListDto<BaseBeneficiaryGroupServiceListModelDto>>(this.baseServiceUrl + 'baseBeneficiaryGroupService/getAllBaseBeneficiaryGroupService', filters);
  }

  createtBaseBeneficiaryGroupService(baseBeneficiaryGroupServiceListModelDto: BaseBeneficiaryGroupServiceListModelDto): Observable<ResultObject<BaseBeneficiaryGroupServiceListModelDto>> {
    return this.http.post<ResultObject<BaseBeneficiaryGroupServiceListModelDto>>(this.baseServiceUrl + 'baseBeneficiaryGroupService/createtBaseBeneficiaryGroupService', baseBeneficiaryGroupServiceListModelDto);
  }


}
