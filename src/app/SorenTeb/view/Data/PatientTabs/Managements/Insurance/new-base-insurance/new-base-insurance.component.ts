import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BaseServiceFirstListModelDto} from '../../../../../../model/Base/BaseService/base-service-first-list-model-dto';
import {NgForm} from '@angular/forms';
import {BaseInsuranceDto} from '../../../../../../model/Base/Insurance/base-insurance-dto';
import {PatientDetailBaseComponent} from '../../../patient-detail-base/patient-detail-base.component';
import {BaseInsuranceService} from '../../../../../../controller/Base/Insurance/base-insurance.service';
import {EnumMessageType} from '../../../../../../controller/general/notification.service';
declare var $: any;

@Component({
  selector: 'app-new-base-insurance',
  templateUrl: './new-base-insurance.component.html',
  styleUrls: ['./new-base-insurance.component.css']
})
export class NewBaseInsuranceComponent extends PatientDetailBaseComponent implements OnInit {

  @Input() baseInsuranceFirst: BaseInsuranceDto;
  @ViewChild('f') registerForm: NgForm;

  constructor(private baseInsuranceService: BaseInsuranceService) {
    super();
  }

  ngOnInit(): void {
  }



  createBaseService() {


    console.log('لیست ثبت بیمه');
    console.log(this.baseInsuranceFirst);
    this.makeResponse(this.baseInsuranceService.createtBaseInsurance(this.baseInsuranceFirst), true, resultObject => {
      console.log('موقع ثبت بیمه');
      console.log(resultObject.result);
      if (resultObject !== null && resultObject.result !== null) {
        this.notificationService.toastMessage(EnumMessageType.success, 'عملیات موفق', 'ثبت با موفقیت انجام شد');
        this.baseInsuranceService.subjectRefereshBaseInsurance.next(true);
        this.registerForm.reset();

        $('#NewBaseInsurance').modal('hide');

      }
    });

  }

  onSubmit() {
    this.createBaseService();
  }

}
