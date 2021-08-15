import { Injectable } from '@angular/core';
import {ReceptionFilterDto} from '../../../model/filter/reception-filter-dto';
import {Observable, Subject} from 'rxjs';
import {ResultListDto} from '../../general/result-list-dto';
import {ReceptionModelByIdModelDto} from '../../../model/Data/Reception/reception-model-by-id-model-dto';
import {BaseMemberPanelService} from '../../config/base-member-panel.service';
import {BaseBeneficiaryListModelDto} from '../../../model/Base/Beneficiary/base-beneficiary-list-model-dto';
import {BeneficiaryFilterDto} from '../../../model/filter/beneficiary-filter-dto';
import {BaseBeneficiarySpecialModelDto} from '../../../model/Base/Specials/base-beneficiary-special-model-dto';
import {ResultObject} from '../../general/result-object';

@Injectable({
  providedIn: 'root'
})
export class BaseBeneficiaryService extends BaseMemberPanelService {

  public subjectNewBaseBeneficiary = new Subject<any>();
  public subjectRefereshBaseBeneficiary = new Subject<any>();

  getAllBeneficiary(filters: BeneficiaryFilterDto): Observable<ResultListDto<BaseBeneficiaryListModelDto>> {
    return this.http.post<ResultListDto<BaseBeneficiaryListModelDto>>(this.baseServiceUrl + 'baseBeneficiary/getAllBeneficiary', filters);
  }

  getAllBeneficiaryFirst(filters: BeneficiaryFilterDto): Observable<ResultListDto<BaseBeneficiaryListModelDto>> {
    return this.http.post<ResultListDto<BaseBeneficiaryListModelDto>>(this.baseServiceUrl + 'baseBeneficiary/getAllBeneficiaryFirst', filters);
  }

  createtBaseBeneficiary(baseBeneficiaryListModelDto: BaseBeneficiaryListModelDto): Observable<ResultObject<BaseBeneficiaryListModelDto>> {
    return this.http.post<ResultObject<BaseBeneficiaryListModelDto>>(this.baseServiceUrl + 'baseBeneficiary/createtBaseBeneficiary', baseBeneficiaryListModelDto);
  }

}

