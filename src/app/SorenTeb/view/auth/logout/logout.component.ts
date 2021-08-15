import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../controller/Base/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  template: '<div></div>'
})
export class LogoutComponent implements OnInit {

  constructor(private  authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.logout();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}

