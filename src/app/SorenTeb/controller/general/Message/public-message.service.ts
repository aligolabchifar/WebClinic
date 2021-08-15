import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicMessageService {

  public  subject = new Subject<any>();
  constructor() { }

  send_message(message) {
    this.subject.next(message);
  }
  get_message() {
    return this.subject.asObservable();
  }
}
