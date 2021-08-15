import {Component, OnInit} from '@angular/core';
import {BaseMemberPanelPageComponent} from '../../../controller/config/base-member-panel-page/base-member-panel-page.component';
import {Router} from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseMemberPanelPageComponent implements OnInit {
isReferesh: boolean;
  constructor(private router: Router) {
    super();
    this.router.navigate(['/dashboard']);

    this.isReferesh = true;
    console.log('درست');
  }

  ngOnInit(): void {
    console.log('اینجا صفحه داشبورد است');

    // this.router.navigate(['/dashboard']);






  }





}
