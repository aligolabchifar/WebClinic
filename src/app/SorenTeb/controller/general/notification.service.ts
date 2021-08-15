import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
export enum EnumMessageType {
  success,
  danger,
  info,
  warn
}

export enum EnumMessageMode {
  toast,
  bootstrap
}
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  static subject = new Subject<any>();

  constructor() { }
  toastMessage(type: EnumMessageType, title: string, message: string) {
    NotificationService.subject.next({messageMode: EnumMessageMode.toast, messageType: type , messageTitle: title, messageBody: message });
  }

  bootstrapMessage(type: EnumMessageType, title: string, message: string) {
    NotificationService.subject.next({messageMode: EnumMessageMode.bootstrap, messageType: type , messageTitle: title, messageBody: message });
  }

  clearMessage() {
    NotificationService.subject.next({clear: true });
  }

  getMessage(): Observable<any> {
    return NotificationService.subject.asObservable();
  }

}
