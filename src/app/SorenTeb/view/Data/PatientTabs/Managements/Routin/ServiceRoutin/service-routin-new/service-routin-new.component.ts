import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PatientDetailBaseComponent} from '../../../../patient-detail-base/patient-detail-base.component';
import {NgForm} from '@angular/forms';
import {BaseRoutinListModelDto} from '../../../../../../../model/Base/Routin/base-routin-list-model-dto';
import {BaseServiceRoutinService} from '../../../../../../../controller/Base/Routin/base-service-routin.service';
import {EnumMessageType} from '../../../../../../../controller/general/notification.service';
declare var $: any;

@Component({
  selector: 'app-service-routin-new',
  templateUrl: './service-routin-new.component.html',
  styleUrls: ['./service-routin-new.component.css']
})
export class ServiceRoutinNewComponent extends PatientDetailBaseComponent implements OnInit {

  @ViewChild('f') registerForm: NgForm;
  @Input() baseRoutin: BaseRoutinListModelDto;

  constructor(private baseServiceRoutinService: BaseServiceRoutinService) {
    super();
  }

  ngOnInit(): void {
  }


  createBaseRoutin() {
    this.makeResponse(this.baseServiceRoutinService.createtBaseServiceRoutin(this.baseRoutin), true, resultObject => {
      console.log('موقع ثبت روتین');
      console.log(resultObject.result);
      if (resultObject !== null && resultObject.result !== null) {
        this.notificationService.toastMessage(EnumMessageType.success, 'عملیات موفق', 'ثبت با موفقیت انجام شد');
        this.baseServiceRoutinService.subjectRefereshBaseServiceRoutin.next(true);
        this.registerForm.reset();

        $('#NewBaseRoutin').modal('hide');

      }
    });

  }


  onSubmit() {
      this.createBaseRoutin();
    }


}
