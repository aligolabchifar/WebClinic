import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {BaseBeneficiarySpecialModelDto} from '../../../../../../model/Base/Specials/base-beneficiary-special-model-dto';
import {PatientDetailBaseComponent} from '../../../patient-detail-base/patient-detail-base.component';
import {BaseBeneficiarySpecialService} from '../../../../../../controller/Base/Specials/base-beneficiary-special.service';
import {BaseBeneficiaryGroupsService} from '../../../../../../controller/Base/BeneficiaryGroup/base-beneficiary-groups.service';
import {EnumMessageType} from '../../../../../../controller/general/notification.service';
import {BaseBeneficiaryGroupsListModelDto} from '../../../../../../model/Base/BeneficiaryGroups/base-beneficiary-groups-list-model-dto';
declare var $: any;

@Component({
  selector: 'app-new-base-beneficiary-group',
  templateUrl: './new-base-beneficiary-group.component.html',
  styleUrls: ['./new-base-beneficiary-group.component.css']
})
export class NewBaseBeneficiaryGroupComponent extends PatientDetailBaseComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  @Input() baseBeneficiaryGroups: BaseBeneficiaryGroupsListModelDto;
  constructor(private baseBeneficiaryGroupsService: BaseBeneficiaryGroupsService) {
    super();
  }

  ngOnInit(): void {

  }

  createBeneficiaryGroup() {



    this.makeResponse(this.baseBeneficiaryGroupsService.createtBeneficiaryGroups(this.baseBeneficiaryGroups), true, resultObject => {
      console.log('موقع ثبت  ریز تخصص');
      console.log(resultObject.result);
      if (resultObject !== null && resultObject.result !== null) {
        this.notificationService.toastMessage(EnumMessageType.success, 'عملیات موفق', 'ثبت با موفقیت انجام شد');
        this.baseBeneficiaryGroupsService.subjectRefereshBaseBeneficiaryGroup.next(true);
        this.registerForm.reset();
        $('#NewBeneficiaryGroupsList').modal('hide');

      }
    });

  }

  onSubmit() {
    console.log('ریز تخصص');
    console.log(this.baseBeneficiaryGroups);
    //
    if (this.baseBeneficiaryGroups.beneficiaryGroupName === '' || this.baseBeneficiaryGroups.beneficiaryGroupName === null)
    {
      this.notificationService.toastMessage(EnumMessageType.danger, 'خطا', 'لطفا نام تخصص را انتخاب کنید');
    }
    else
    {
      this.createBeneficiaryGroup();
    }
  }
}
