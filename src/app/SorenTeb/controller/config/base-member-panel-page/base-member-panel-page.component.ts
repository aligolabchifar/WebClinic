import {Component, OnInit, ViewChild} from '@angular/core';
import {BasePageComponent} from '../../general/base-page/base-page.component';
import {MatPaginator} from '@angular/material/paginator';
import {AppModule} from '../../../../app.module';
import {PublicMessageService} from '../../general/Message/public-message.service';
import {ActivityDto} from '../../../model/security/activity-dto';
import {AuthService} from '../../Base/auth.service';

@Component({
  template: ''
})
export class BaseMemberPanelPageComponent extends BasePageComponent {
  datePickerConfig = {format: 'jYYYY/jMM/jDD'};
  timePickerConfig = {format: 'hh/mm/ss'};
  @ViewChild(MatPaginator) mainpaginator: MatPaginator;

  constructor() {
    super();

    //موقتی کامنت شود
    // this.setPageTitle();
  }
  // getActivity(path: string): ActivityDto {
  //   return AuthService.acti.find(a => a.name === path);
  // }
  public publicMessage = AppModule.injector.get(PublicMessageService);

  //موقتی کامنت شود
  // setPageTitle() {
  //   const activity: ActivityDto = this.getActivity(this.baseUrl);
  //   if (activity !== undefined && activity != null) {
  //     this.pageTitle = activity.title;
  //     this.pageSummary = activity.description;
  //   }
  // }
  setPaginator() {
    this.mainpaginator._intl.itemsPerPageLabel = 'تعداد آیتمها در هر صفحه.';
    this.mainpaginator._intl.firstPageLabel = 'اولین صفحه';
    this.mainpaginator._intl.previousPageLabel = 'صفحه قبلی';
    this.mainpaginator._intl.nextPageLabel = 'صفحه بعدی';
    this.mainpaginator._intl.lastPageLabel = 'آخرین صفحه';
  }

  //موقتی کامنت شود
  // getActivity(path: string): ActivityDto {
  //   return AuthService.userInfo.activityDtos.find(a => a.path === path);
  // }
  validateForm(form: any) {
    this.publicMessage.send_message(true);
    return form.valid;
  }

  private getForm(element: Element) {
    const parent = element.parentElement;
    if (parent.nodeName !== 'FORM') {
      this.getForm(parent);
    } else {
      const parents = parent;
    }
  }

  set_Session(sessionObject: any, sessionName: string) {
    sessionStorage.removeItem(sessionName);
    sessionStorage.setItem(sessionName, JSON.stringify(sessionObject));
  }

  get_Session(sessionName: string) {
    const sessionStr = sessionStorage.getItem(sessionName);
    if (sessionStr != null || sessionStr !== '') {
      return (JSON.parse(sessionStr));
    }
    return null;
  }
  remove_Session(sessionName: string) {
    sessionStorage.removeItem(sessionName);
  }
}
