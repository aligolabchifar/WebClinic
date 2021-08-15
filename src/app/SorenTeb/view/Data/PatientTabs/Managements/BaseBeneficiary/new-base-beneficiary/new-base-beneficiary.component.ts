import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {BaseBeneficiaryListModelDto} from '../../../../../../model/Base/Beneficiary/base-beneficiary-list-model-dto';
import {PatientDetailBaseComponent} from '../../../patient-detail-base/patient-detail-base.component';
import {EnumMessageType} from '../../../../../../controller/general/notification.service';
import {BaseBeneficiarySpecialService} from '../../../../../../controller/Base/Specials/base-beneficiary-special.service';
import {BaseBeneficiarySpecialFilterDto} from '../../../../../../model/filter/base-beneficiary-special-filter-dto';
import {BaseBeneficiaryService} from '../../../../../../controller/Base/Beneficiary/base-beneficiary.service';
import {BaseBeneficiaryGroupsService} from '../../../../../../controller/Base/BeneficiaryGroup/base-beneficiary-groups.service';
import {BaseBeneficiaryGroupsFilterDto} from '../../../../../../model/filter/base-beneficiary-groups-filter-dto';
declare var $: any;

@Component({
  selector: 'app-new-base-beneficiary',
  templateUrl: './new-base-beneficiary.component.html',
  styleUrls: ['./new-base-beneficiary.component.css']
})
export class NewBaseBeneficiaryComponent extends PatientDetailBaseComponent implements OnInit {

  @ViewChild('f') registerForm: NgForm;
  @Input() baseBeneficiary: BaseBeneficiaryListModelDto;
  public lstSpecialList: any;
  public lstBeneficiaryGroupList: any;
  baseBeneficiarySpecialFilterDto = new BaseBeneficiarySpecialFilterDto();
  baseBeneficiaryGroupsFilterDto = new BaseBeneficiaryGroupsFilterDto();
  public listSex = new Array<{ id: number, name: string }>({id: 1, name: 'مرد'}, {id: 0, name: 'زن'});
  constructor(private baseBeneficiaryService: BaseBeneficiaryService, private baseBeneficiarySpecialService: BaseBeneficiarySpecialService
  ,           private baseBeneficiaryGroupsService: BaseBeneficiaryGroupsService) {
    super();
  }

  ngOnInit(): void {
    this.refereshSpecial();
    this.refereshBeneficiaryGroup();
  }

  createBaseBeneficiary() {



    this.makeResponse(this.baseBeneficiaryService.createtBaseBeneficiary(this.baseBeneficiary), true, resultObject => {
      console.log('موقع ثبت پزشک');
      console.log(resultObject.result);
      if (resultObject !== null && resultObject.result !== null) {
        this.notificationService.toastMessage(EnumMessageType.success, 'عملیات موفق', 'ثبت با موفقیت انجام شد');
        this.baseBeneficiaryService.subjectRefereshBaseBeneficiary.next(true);
        this.registerForm.reset();

        $('#NewBaseBeneficiary').modal('hide');

      }
    });

  }

  onSubmit() {

    console.log('پزشک');
    console.log(this.baseBeneficiary);
    //
    if (this.baseBeneficiary.beneficiaryFirstName === '' || this.baseBeneficiary.beneficiaryFirstName === null)
    {
      this.notificationService.toastMessage(EnumMessageType.danger, 'خطا', 'لطفا نام پزشک را انتخاب کنید');
    }
    else  if (this.baseBeneficiary.beneficiaryLastName === '' || this.baseBeneficiary.beneficiaryLastName === null)
    {
      this.notificationService.toastMessage(EnumMessageType.danger, 'خطا', 'لطفا نام خانوادگی پزشک را انتخاب کنید');
    }
    else
    {
      this.createBaseBeneficiary();
    }

  }



  refereshSpecial() {

    this.baseBeneficiarySpecialFilterDto.isDisabled = false;
    this.makeResponse(this.baseBeneficiarySpecialService.getAllBaseBeneficiarySpecial(this.baseBeneficiarySpecialFilterDto), true, resultObject => {
      if (resultObject.results) {
        this.lstSpecialList = resultObject.results;
        console.log('تخصص های قابل دسترسی');
        console.log(resultObject.results);

      }
    });
  }




  refereshBeneficiaryGroup() {
    this.baseBeneficiaryGroupsFilterDto.isDisabled = false;
    this.makeResponse(this.baseBeneficiaryGroupsService.getAllBaseBeneficiaryGroups(this.baseBeneficiaryGroupsFilterDto), true, resultObject => {

      if (resultObject.results) {
        this.lstBeneficiaryGroupList = resultObject.results;
        console.log('ریز تخصص های قابل دسترسی');
        console.log(resultObject.results);
      }
    });
  }






  valueChangeSex(value: any) {
    this.baseBeneficiary.sex = value;
  }

  valueChangeSpecial(value: any) {
    this.baseBeneficiary.baseBeneficiarySpecialId = value;
  }

  valueChangeBeneficiaryGroup(value: any) {
    this.baseBeneficiary.baseBeneficiaryGroupsId = value;
  }
}
