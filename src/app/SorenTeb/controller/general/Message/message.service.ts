import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  static subject = new BehaviorSubject<any>({});

  constructor() {

  }

  send_message(message: any) {
    MessageService.subject.next(message);
  }
  get_message() {
    return MessageService.subject.asObservable();
  }
}
