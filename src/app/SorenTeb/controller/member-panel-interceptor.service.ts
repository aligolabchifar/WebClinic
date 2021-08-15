import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent, HttpHeaders, HttpErrorResponse
} from '@angular/common/http';

import {Observable, throwError, Subject} from 'rxjs';
import {catchError, takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {of} from 'rxjs/internal/observable/of';
import {fromPromise} from 'rxjs-compat/observable/fromPromise';
import {BasePageComponent} from './general/base-page/base-page.component';
import {PublicMessageService} from './general/Message/public-message.service';
import {AuthService} from './Base/auth.service';


@Injectable()
export class MemberPanelInterceptorService extends BasePageComponent implements HttpInterceptor {

  constructor(private router: Router, private message: PublicMessageService) {
    super();
    this.get_message();

  }

  cancel = new Subject<boolean>();
  get_message() {
    this.message.get_message().subscribe(data => {
      if (data && data.message == 'cancel') {
        this.cancel.next(true);
      }
    });
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // return Observable.fromPromise(this.handleAccess(request, next));
    return fromPromise(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
    Promise<HttpEvent<any>> {
    let token = '';
    if (AuthService.userInfo !== null && AuthService.userInfo !== undefined) {
      token = AuthService.userInfo.token;

    }

    let changedRequest = request;
    // HttpHeader object immutable - copy values
    const headerSettings: { [name: string]: string | string[]; } = {};

    for (const key of request.headers.keys()) {
      headerSettings[key] = request.headers.getAll(key);
    }
    if (token !== '') {
      headerSettings.Authorization = 'Bearer ' + token;
    }

    const newHeader = new HttpHeaders(headerSettings);
    changedRequest = request.clone({headers: newHeader});
    return next.handle(changedRequest).pipe(
      takeUntil(this.cancel),
      catchError((err, caught: Observable<HttpEvent<any>>) => {
        if (err instanceof HttpErrorResponse && (err.status === 401 || err.status === 403)) {
          this.loadingService.hideLoading();
          this.router.navigate(['/mp/login'], {queryParams: {returnUrl: changedRequest.url}});
          return of(err as any);
        }
        throw err;
      })
    ).toPromise();
  }
}
