import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';


@Injectable()
export class PageGuard implements CanActivate {
  page: string;


  constructor(private router: Router) {


  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // const menuService = new MenuService();
    // this.router.events
    //   .filter((event) => event instanceof NavigationEnd)
    //   .subscribe(event => {
    //
    //     const baseUrl = this.router.url.substring(1);
    //
    //     if (baseUrl.indexOf('/') === -1) {
    //       this.page = baseUrl;
    //     } else {
    //       this.page = baseUrl.substring(0, baseUrl.indexOf('/'));
    //     }
    //
    //     if (this.page !== 'logout' && this.page !== 'login') {
    //
    //       if (this.page !== '') {
    //
    //         const menuItem = menuService.getPage(baseUrl);
    //
    //         if (!isNullOrUndefined(menuItem)) {
    //           return true;
    //         } else {
    //           this.router.navigate(['/admin/no-access']);
    //           return false;
    //         }
    //       }
    //     } else {
    //       return true;
    //     }
    //
    //   });

    return true;
  }
}
