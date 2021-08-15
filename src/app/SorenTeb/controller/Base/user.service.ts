import { Injectable } from '@angular/core';
import {BaseMemberPanelService} from '../config/base-member-panel.service';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {ResultObject} from '../general/result-object';
import {BaseUserModelDto} from '../../model/Base/User/base-user-model-dto';
import {AuthParam} from '../../model/filter/auth-param';
import {BaseUserFilter} from '../../model/filter/base-user-filter';
import {ResultListDto} from '../general/result-list-dto';
import {RoleActivityModelDto} from '../../model/Base/User/role-activity-model-dto';
import {SecurityFilterDto} from '../../model/filter/security-filter-dto';

@Injectable()
export class UserService extends BaseMemberPanelService{
  public subjectUser = new Subject<any>();


  login(authParam: AuthParam) {
    return this.http.post<ResultObject<BaseUserModelDto>>(this.baseServiceUrl + 'auth/login', authParam).pipe(
      map(res => {
        return res;
      })
    )
  }

  getUserListQuery(filters: BaseUserFilter): Observable<ResultListDto<BaseUserModelDto>> {
    return this.http.post<ResultListDto<BaseUserModelDto>>(this.baseServiceUrl + 'baseUser/getAllUsers', filters);
  }


  getAllRoleActivity(filters: SecurityFilterDto): Observable<ResultListDto<RoleActivityModelDto>> {
    return this.http.post<ResultListDto<RoleActivityModelDto>>(this.baseServiceUrl + 'baseUser/getAllRoleActivity', filters);
  }


}
