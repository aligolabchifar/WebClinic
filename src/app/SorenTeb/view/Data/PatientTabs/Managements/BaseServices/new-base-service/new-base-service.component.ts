import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PatientDetailBaseComponent} from '../../../patient-detail-base/patient-detail-base.component';
import {BaseServiceFirstListModelDto} from '../../../../../../model/Base/BaseService/base-service-first-list-model-dto';
import {NgForm} from '@angular/forms';
import {BaseServiceService} from '../../../../../../controller/Base/BaseServices/base-service.service';
import {EnumMessageType} from '../../../../../../controller/general/notification.service';
declare var $: any;

@Component({
  selector: 'app-new-base-service',
  templateUrl: './new-base-service.component.html',
  styleUrls: ['./new-base-service.component.css']
})
export class NewBaseServiceComponent extends PatientDetailBaseComponent implements OnInit {

  @Input() baseServiceFirst: BaseServiceFirstListModelDto;
  @ViewChild('f') registerForm: NgForm;


  constructor(private baseServiceService: BaseServiceService) {
    super();
  }

  ngOnInit(): void {

      // this.createBaseService();

  }


  createBaseService() {



    this.makeResponse(this.baseServiceService.createtBaseService(this.baseServiceFirst), true, resultObject => {
      console.log('موقع ثبت سرویس');
      console.log(resultObject.result);
      if (resultObject !== null && resultObject.result !== null) {
        this.notificationService.toastMessage(EnumMessageType.success, 'عملیات موفق', 'ثبت با موفقیت انجام شد');
        this.baseServiceService.subjectRefereshBaseService.next(true);
        this.registerForm.reset();

        $('#NewBaseService').modal('hide');

      }
    });

  }

  onSubmit() {
    this.createBaseService();
  }
}
