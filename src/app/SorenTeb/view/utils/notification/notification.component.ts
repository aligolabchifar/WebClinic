import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {EnumMessageMode, EnumMessageType, NotificationService} from '../../../controller/general/notification.service';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit, OnDestroy {
  @ViewChild('alert') alert: ElementRef;
  messageTitle: string;
  messageBody: string;
  show: boolean;
  messageType: EnumMessageType;
  bootstrapMessageTypeString = 'success';
  subscription: Subscription;

  constructor(private toaster: ToastrService, private notificationService: NotificationService) {
    this.subscription = this.notificationService.getMessage().subscribe(value => {
      if (value.clear) {
        this.clearMessage();
        // tslint:disable-next-line:no-conditional-assignment
      } else {
        if (value.messageMode === EnumMessageMode.toast) {
          this.makeToastMessage(value.messageType, value.messageTitle, value.messageBody);
          // tslint:disable-next-line:no-conditional-assignment
        } else if (value.messageMode === EnumMessageMode.bootstrap) {
          this.makeBootstapMessage(value.messageType, value.messageTitle, value.messageBody);
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
  }
  private makeToastMessage(type: EnumMessageType, title: string, body: string) {
    this.show = false;
    this.makeMessage(true, type, title, body);
  }
  private makeBootstapMessage(type: EnumMessageType, title: string, body: string) {
    this.show = true;
    this.bootstrapMessageTypeString = this.makeMessage(false, type, title, body);
  }
  private clearMessage() {
    this.messageTitle = '';
    this.messageBody = '';
    this.show = false;
  }
  private makeMessage(isToast: boolean, messageType: EnumMessageType, title: string, body: string): string {
    this.messageTitle = title;
    this.messageBody = body;
    switch (messageType) {
      case EnumMessageType.success:
        if (isToast) {
          this.toaster.success(body, title);
        }
        return 'success';
        break;
      case EnumMessageType.danger:
        if (isToast) {
          this.toaster.error(body, title);
        }
        return 'danger';
        break;
      case EnumMessageType.info:
        if (isToast) {
          this.toaster.info(body, title);
        }
        return 'info';
        break;
      case EnumMessageType.warn:
        if (isToast) {
          this.toaster.warning(body, title);
        }
        return 'warning';
        break;
    }

  }
}
