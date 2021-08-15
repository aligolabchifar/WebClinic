import {Component, OnInit, ViewChild} from '@angular/core';
import {PatientDetailBaseComponent} from '../../../../patient-detail-base/patient-detail-base.component';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-base-service-routin-detail-list',
  templateUrl: './base-service-routin-detail-list.component.html',
  styleUrls: ['./base-service-routin-detail-list.component.css']
})
export class BaseServiceRoutinDetailListComponent extends PatientDetailBaseComponent implements OnInit  {



  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
