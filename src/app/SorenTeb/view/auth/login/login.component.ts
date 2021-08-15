import { Component, OnInit } from '@angular/core';
import {BasePageComponent} from '../../../controller/general/base-page/base-page.component';
import {LoadingBarService} from '@ngx-loading-bar/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../controller/Base/auth.service';
import {SecurityFilterDto} from '../../../model/filter/security-filter-dto';
import {map} from 'rxjs/operators';
import {isNullOrUndefined} from 'util';
import {UserService} from '../../../controller/Base/user.service';
import {RoleActivityModelDto} from '../../../model/Base/User/role-activity-model-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BasePageComponent implements OnInit {
  username: string;
  password: string;
  paraclinicChildId: number;
  paraclinicChildId2: number;
  timeout: any = null;
  private roleActivityStorageKey = 'sorenTeb-roleActivity-storage';
  private  ParaclinicChildId = 'sorenTeb-paraclinicChildId-storage';
  showErrorMessage = false;
  errorMessage = '';
  public listItems: Array<{ text: string , value: number}> = [];
public RoleActivityModelDto: [RoleActivityModelDto];
  isShowItem: boolean;
  private paraclinicChildList = 'sorenTeb-paraclinicChildList-storage';
  isShowLoading: boolean;
  constructor(public loadingBar: LoadingBarService, private router: Router, private authService: AuthService, public userService: UserService) {
    super();
    this.loadingBar.complete();
  }
  securityFilterDto = new SecurityFilterDto();


  ngOnInit(): void {
  }

  hide_side() {
    const message = {} as any;
    message.message = 'hide_side';
    this.messageService.send_message(message);
  }

  login() {
    // this.securityFilterDto.baseParaclinicChildId = this.paraclinicChildId2;
    // this.securityFilterDto.roleId = AuthService.userInfo.roleId;
    // localStorage.setItem(this.ParaclinicChildId, JSON.stringify(this.paraclinicChildId2));
    //
    // console.log('this.securityFilterDto');
    // console.log(this.securityFilterDto);
    // this.timeout = setTimeout(() => {


    this.router.navigate(['/dashboard']);


    // }, 3000);
    // this.RoleActivity();

    // this.listItems = [];
    // this.showErrorMessage = false;
    // this.loadingBar.start();
    // this.authService.login(this.username, this.password, this.paraclinicChildId).subscribe(res => {
    //   this.loadingBar.complete();
    //   if (!res) {
    //     this.errorMessage = 'اطلاعات وارد شده جهت ورود صحیح نیست';
    //     this.showErrorMessage = true;
    //   } else {
    //     console.log('این چیست ؟');
    //     console.log(AuthService.userInfo);
    //     if (AuthService.userInfo !== undefined && AuthService.userInfo !== null && AuthService.userInfo.id !== 0 ) {
    //
    //
    //       for (const item of AuthService.userInfo.baseUserParaclinicChildModel) {
    //
    //         this.listItems.push({text: item.paraclinicChildName, value : item.baseParaclinicChildId});
    //       }
    //
    //       console.log('لیست پاراکلینیک');
    //       console.log(this.listItems);
    //
    //
    //
    //
    //       // this.router.navigate(['/dashboard']);
    //
    //
    //     } else {
    //       this.errorMessage = 'خطا در ورود به پنل، لطفاً از مرورگر بروز استفاده نمایید';
    //       this.showErrorMessage = true;
    //     }
    //   }
    // }, error => {
    //   this.errorMessage = 'اطلاعات وارد شده جهت ورود صحیح نیست';
    //   this.showErrorMessage = true;
    //   this.loadingBar.complete();
    // });
  }
  enter(event: any) {
    if (event.keyCode === 13) {
      this.login();
    }
  }

  valueChange(value: any) {
    // this.userRoleDto.roleId = value;
    //
    // this.UserDto.roleId = value;
    this.paraclinicChildId2 = value;
    console.log('انتخاب پاراکلینیک');
    console.log( this.paraclinicChildId2);
    // this.RoleActivity();

    this.securityFilterDto.baseParaclinicChildId = this.paraclinicChildId2;
    this.securityFilterDto.roleId = AuthService.userInfo.roleId;

    console.log('مشخصات کاربر جاری');
    console.log(AuthService.userInfo);
    this.RoleActivity();
    localStorage.setItem(this.ParaclinicChildId, JSON.stringify(this.paraclinicChildId2));

    console.log('this.securityFilterDto');
    console.log(this.securityFilterDto);
  }


  RoleActivity() {

    this.makeResponse(this.userService.getAllRoleActivity(this.securityFilterDto), true, resultObject => {
      if (resultObject != null) {
        this.RoleActivityModelDto = resultObject.results;
        console.log('مقدار دسترسی');
        console.log(this.RoleActivityModelDto);
        localStorage.setItem(this.roleActivityStorageKey, JSON.stringify(this.RoleActivityModelDto));
      }
    });








  }

  AllRoleActivity()
  {
    return this.userService.getAllRoleActivity(this.securityFilterDto)
      .pipe(
        map(
          (role) => {
            console.log('اینجا 1');
            console.log(role);
            if (!isNullOrUndefined(role)) {
              if ((role.serverErrors !== undefined && role.serverErrors !== null && role.serverErrors.length > 0) || role.result == null) {
                return false;
              } else {
                console.log('اینجا 2');
                localStorage.setItem(this.roleActivityStorageKey, JSON.stringify(role.result));

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

  SetParaclinic() {

    this.listItems = [];
    this.showErrorMessage = false;
    this.loadingBar.start();
    this.authService.login(this.username, this.password, this.paraclinicChildId).subscribe(res => {
      this.loadingBar.complete();
      console.log('مقدار res');
      console.log(res);
      console.log(AuthService.userInfo);
      if (!res) {
        this.errorMessage = 'نام کاربری و یا رمز ورود اشتباه است';
        this.showErrorMessage = true;
      } else {

        if (AuthService.userInfo !== undefined && AuthService.userInfo !== null && AuthService.userInfo.id !== 0 ) {

          this.isShowItem = true;
          for (const item of AuthService.userInfo.baseUserParaclinicChildModel) {

            this.listItems.push({text: item.paraclinicChildName, value : item.baseParaclinicChildId});
          }
          localStorage.setItem(this.paraclinicChildList, JSON.stringify(this.listItems));
          // this.router.navigate(['/dashboard']);


        } else {
          this.errorMessage = 'نام کاربری و یا رمز ورود اشتباه است';
          this.showErrorMessage = true;
        }
      }
    }, error => {
      this.errorMessage = 'اطلاعات وارد شده جهت ورود صحیح نیست';
      this.showErrorMessage = true;
      this.loadingBar.complete();
    });
  }
}
