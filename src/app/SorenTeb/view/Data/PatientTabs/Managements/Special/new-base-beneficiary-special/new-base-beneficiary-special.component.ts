import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BaseServiceGroupModelDto} from '../../../../../../model/Base/BaseService/base-service-group-model-dto';
import {BaseBeneficiarySpecialModelDto} from '../../../../../../model/Base/Specials/base-beneficiary-special-model-dto';
import {PatientDetailBaseComponent} from '../../../patient-detail-base/patient-detail-base.component';
import {BaseBeneficiarySpecialService} from '../../../../../../controller/Base/Specials/base-beneficiary-special.service';
import {EnumMessageType} from '../../../../../../controller/general/notification.service';
import {NgForm} from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-new-base-beneficiary-special',
  templateUrl: './new-base-beneficiary-special.component.html',
  styleUrls: ['./new-base-beneficiary-special.component.css']
})
export class NewBaseBeneficiarySpecialComponent extends PatientDetailBaseComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  @Input() baseBeneficiarySpecial: BaseBeneficiarySpecialModelDto;
  constructor(private baseBeneficiarySpecialService: BaseBeneficiarySpecialService) {
    super();
  }

  ngOnInit(): void {
  }


  createBeneficiarySpecial() {



    this.makeResponse(this.baseBeneficiarySpecialService.createtBeneficiarySpecial(this.baseBeneficiarySpecial), true, resultObject => {
      console.log('موقع ثبت تخصص');
      console.log(resultObject.result);
      if (resultObject !== null && resultObject.result !== null) {
        this.notificationService.toastMessage(EnumMessageType.success, 'عملیات موفق', 'ثبت با موفقیت انجام شد');
        this.baseBeneficiarySpecialService.subjectRefereshBaseBeneficiarySpecial.next(true);
        this.registerForm.reset();

        $('#NewSpecialList').modal('hide');

      }
    });

  }



  onSubmit() {

    console.log('تخصص');
    console.log(this.baseBeneficiarySpecial);
    //
    if (this.baseBeneficiarySpecial.beneficiarySpecialName === '' || this.baseBeneficiarySpecial.beneficiarySpecialName === null)
    {
      this.notificationService.toastMessage(EnumMessageType.danger, 'خطا', 'لطفا نام تخصص را انتخاب کنید');
    }
    else
    {
      this.createBeneficiarySpecial();
    }

  }


}
