import { Component, OnInit } from '@angular/core';
import {EnumMessageType, NotificationService} from '../notification.service';
import {LoadingService} from '../loading.service';
import {MessageService} from '../Message/message.service';
import {Observable} from 'rxjs';

@Component({
  template: ''
})
export class BasePageComponent  {
  public pageSummary: string;
  public pageTitle: string;
  public notificationService: NotificationService;
   public loadingService: LoadingService;
  public isShowForm = false;
  public isShowFilterForm = false;
  public totalListRowCount = 0;
  public baseUrl = '';
 public messageService: MessageService;
  public virtualization: any = { itemHeight: 28 , pageSize: 100 };

  constructor() {
    this.notificationService = new NotificationService();
    this.loadingService = new LoadingService();
    this.messageService = new MessageService();
  }

  showMainForm() {
    this.isShowForm = !this.isShowForm;
    if (this.isShowForm) {
      this.isShowFilterForm = false;
    }
  }

  showFormStyle() {
    if (!this.isShowForm) {
      return 'none';
    } else {
      return 'block';
    }
  }

  showFilterForm() {
    this.isShowFilterForm = !this.isShowFilterForm;
    if (this.isShowFilterForm) {
      this.isShowForm = false;
    }
  }

  makeResponse(method: Observable<any>, withLoading: boolean, onComplete: (resultObject) => void) {
    if (withLoading) {
      this.loadingService.showLoading();
    }

    method.subscribe(resultObject => {

      const connectionErrorMessage = 'خطا در برقراری ارتباط با سرور، لطفاً مجددا تلاش نمایید';
      if (resultObject == null) {
        this.notificationService.toastMessage(EnumMessageType.danger, 'خطا', connectionErrorMessage);
        onComplete(null);
      } else {
        if (resultObject != null && resultObject.serverErrors != null && resultObject.serverErrors.length > 0) {
          let emsg = '';
          for (const item of resultObject.serverErrors) {
            emsg += item.hint + '\n';
          }
          this.notificationService.toastMessage(EnumMessageType.danger, 'خطا', emsg);
          onComplete(resultObject);
        } else if (resultObject != null) {
          onComplete(resultObject);
        } else {
          this.notificationService.toastMessage(EnumMessageType.danger, 'خطا', connectionErrorMessage);
          onComplete(null);
        }
        if (withLoading) {
          this.loadingService.hideLoading();
        }
      }
    }, errorMessage => {
      if (errorMessage != null && errorMessage !== undefined && errorMessage !== '') {
        console.log(errorMessage)
        this.notificationService.toastMessage(EnumMessageType.danger, 'خطا', errorMessage);
      }
      if (withLoading) {
        this.loadingService.hideLoading();
      }
      onComplete(null);
    });
  }





}
