import { Injectable } from '@angular/core';
import {BaseMemberPanelService} from '../../config/base-member-panel.service';
import {Observable, Subject} from 'rxjs';
import {ResultListDto} from '../../general/result-list-dto';
import {BaseCompanyDto} from '../../../model/Base/Paraclinic/base-company-dto';
import {BaseCompanyFilterDto} from '../../../model/Base/Paraclinic/base-company-filter-dto';

@Injectable({
  providedIn: 'root'
})
export class BaseCompanyService extends BaseMemberPanelService{

  public subjectNewBaseCompany = new Subject<any>();
  public subjectRefereshBaseCompany = new Subject<any>();

  getAllCompanyList(filters: BaseCompanyFilterDto): Observable<ResultListDto<BaseCompanyDto>> {
    return this.http.post<ResultListDto<BaseCompanyDto>>(this.baseServiceUrl + 'BaseCompany/getAllCompanyList', filters);
  }

}
