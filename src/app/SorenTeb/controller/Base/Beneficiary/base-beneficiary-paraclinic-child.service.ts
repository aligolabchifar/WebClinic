import { Injectable } from '@angular/core';
import {BaseMemberPanelService} from '../../config/base-member-panel.service';
import {Observable, Subject} from 'rxjs';
import {BeneficiaryFilterDto} from '../../../model/filter/beneficiary-filter-dto';
import {ResultListDto} from '../../general/result-list-dto';
import {BaseBeneficiaryListModelDto} from '../../../model/Base/Beneficiary/base-beneficiary-list-model-dto';
import {BaseBeneficiaryParaclinicChildListModelDto} from '../../../model/Base/Beneficiary/base-beneficiary-paraclinic-child-list-model-dto';
import {BaseBeneficiaryParaclinicChild2ListModelDto} from '../../../model/Base/Beneficiary/base-beneficiary-paraclinic-child2-list-model-dto';
import {ResultObject} from '../../general/result-object';

@Injectable({
  providedIn: 'root'
})
export class BaseBeneficiaryParaclinicChildService extends BaseMemberPanelService{

  public subjectNewBaseBeneficiaryParaclinicChild = new Subject<any>();
  public subjectRefereshBaseBeneficiaryParaclinicChild = new Subject<any>();

  getAllBeneficiaryParaclinicChild(filters: BeneficiaryFilterDto): Observable<ResultListDto<BaseBeneficiaryParaclinicChildListModelDto>> {
    return this.http.post<ResultListDto<BaseBeneficiaryParaclinicChildListModelDto>>(this.baseServiceUrl + 'baseBeneficiaryParaclinicChild/getAllBeneficiaryParaclinicChild', filters);
  }

  getAllBeneficiaryParaclinicChild2(filters: BeneficiaryFilterDto): Observable<ResultListDto<BaseBeneficiaryParaclinicChild2ListModelDto>> {
    return this.http.post<ResultListDto<BaseBeneficiaryParaclinicChild2ListModelDto>>(this.baseServiceUrl + 'baseBeneficiaryParaclinicChild/getAllBeneficiaryParaclinicChild2', filters);
  }


  createtBaseBeneficiaryParaclinicChild(baseBeneficiaryParaclinicChild2ListModelDto: BaseBeneficiaryParaclinicChild2ListModelDto): Observable<ResultObject<BaseBeneficiaryParaclinicChild2ListModelDto>> {
    return this.http.post<ResultObject<BaseBeneficiaryParaclinicChild2ListModelDto>>(this.baseServiceUrl + 'baseBeneficiaryParaclinicChild/createtBaseBeneficiaryParaclinicChild', baseBeneficiaryParaclinicChild2ListModelDto);
  }


}
