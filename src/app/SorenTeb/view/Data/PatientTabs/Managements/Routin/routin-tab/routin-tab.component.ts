import { Component, OnInit } from '@angular/core';
import {PatientDetailBaseComponent} from '../../../patient-detail-base/patient-detail-base.component';

@Component({
  selector: 'app-routin-tab',
  templateUrl: './routin-tab.component.html',
  styleUrls: ['./routin-tab.component.css']
})
export class RoutinTabComponent extends PatientDetailBaseComponent implements OnInit {

  isShowRoutinList: boolean;
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
