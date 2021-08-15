import { Injectable } from '@angular/core';
import {BaseUserModelDto} from '../../model/Base/User/base-user-model-dto';
import {UserService} from './user.service';
import {AuthParam} from '../../model/filter/auth-param';
import {map} from 'rxjs/operators';
import {isNullOrUndefined} from 'util';
import {SecurityFilterDto} from '../../model/filter/security-filter-dto';
import {BasePageComponent} from '../general/base-page/base-page.component';
import {BaseUserParaclinicChildModelDto} from '../../model/Base/User/base-user-paraclinic-child-model-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static userInfo: BaseUserModelDto;
  private userStorageKey = 'sorenTeb-user-storage';


  constructor(private userService: UserService) {
  }
  securityFilterDto = new SecurityFilterDto();






  login(userName: string, password: string, paraclinicChildId: number) {
    const authParam = new AuthParam();
    authParam.userName = userName;
    authParam.password = password;
    authParam.paraclinicChildId = paraclinicChildId;

    return this.userService.login(authParam)
      .pipe(
        map(
          (user) => {
            if (!isNullOrUndefined(user)) {
              if ((user.serverErrors !== undefined && user.serverErrors !== null && user.serverErrors.length > 0) || user.result == null) {
                return false;
              } else {
                localStorage.setItem(this.userStorageKey, JSON.stringify(user.result));
                AuthService.userInfo = user.result;


                // this.userService.getUserBranches(AuthService.userInfo.id).subscribe(branchresult => {
                //   localStorage.setItem(this.userBranchesStorageKey, JSON.stringify(branchresult.result))
                //
                //   AuthService.userBranches = branchresult.results;
                //
                // });
                return true;
              }
            }
            return false;
          },
          (error) => {
            return false;
          }
        )
      );

  }

  logout() {
    localStorage.clear();
    AuthService.userInfo = null;
  }


  isLoggedIn(): boolean {
    const uo = localStorage.getItem(this.userStorageKey);

    if (uo) {
      AuthService.userInfo = JSON.parse(uo);
      return true;
    } else {
      return false;
    }
  }

  userMustChangePassword() {
    return AuthService.userInfo.mustChangePassword;
  }


}
