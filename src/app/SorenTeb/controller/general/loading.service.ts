import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  static subject = new BehaviorSubject<any>({});
  showLoading() {
    LoadingService.subject.next({show: true });
  }


  hideLoading() {
    LoadingService.subject.next({show: false });
  }
  get(): Observable<any> {
    return LoadingService.subject.asObservable();
  }

  constructor() { }
}
