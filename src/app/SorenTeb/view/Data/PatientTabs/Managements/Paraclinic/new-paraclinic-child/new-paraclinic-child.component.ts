import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PatientDetailBaseComponent} from '../../../patient-detail-base/patient-detail-base.component';
import {NgForm} from '@angular/forms';
import {BaseBeneficiaryListModelDto} from '../../../../../../model/Base/Beneficiary/base-beneficiary-list-model-dto';
import {BaseBeneficiarySpecialFilterDto} from '../../../../../../model/filter/base-beneficiary-special-filter-dto';
import {BaseBeneficiaryGroupsFilterDto} from '../../../../../../model/filter/base-beneficiary-groups-filter-dto';
import {BaseParaclinicChildService} from '../../../../../../controller/Base/ParaclinicChild/base-paraclinic-child.service';
import {BaseCompanyFilterDto} from '../../../../../../model/Base/Paraclinic/base-company-filter-dto';
import {BaseCompanyService} from '../../../../../../controller/Base/ParaclinicChild/base-company.service';
import {BaseParaclinicChildListModelDto} from '../../../../../../model/Base/Paraclinic/base-paraclinic-child-list-model-dto';
import {EnumMessageType} from '../../../../../../controller/general/notification.service';
declare var $: any;

@Component({
  selector: 'app-new-paraclinic-child',
  templateUrl: './new-paraclinic-child.component.html',
  styleUrls: ['./new-paraclinic-child.component.css']
})
export class NewParaclinicChildComponent extends PatientDetailBaseComponent implements OnInit {

  @Input() baseParaclinicChild: BaseParaclinicChildListModelDto;
  @ViewChild('f') registerForm: NgForm;
  public lstCompanyList: any;
  baseCompanyFilterDto = new BaseCompanyFilterDto();
  public listParaclinicType = new Array<{ id: number, name: string }>({id: 1, name: 'کلینیک'}, {id: 2, name: 'دندانپزشکی'}
, {id: 3, name: 'رادیولوژی'}, {id: 4, name: 'سونوگرافی'}, {id: 5, name: 'فیزیوتراپی'}, {id: 6, name: 'آزمایشگاه'});

  constructor(private  baseParaclinicChildService: BaseParaclinicChildService, private  baseCompanyService: BaseCompanyService) {
    super();
  }

  ngOnInit(): void {
    this.refereshCompany();

  }


  refereshCompany() {

    this.makeResponse(this.baseCompanyService.getAllCompanyList(this.baseCompanyFilterDto), true, resultObject => {
      if (resultObject.results) {
        this.lstCompanyList = resultObject.results;
        console.log('لیست شرکت مالی');
        console.log(this.lstCompanyList );

      }
    });
  }


  onSubmit() {
    console.log('پاراکلینیک');
    console.log(this.baseParaclinicChild);
    //
    if (this.baseParaclinicChild.paraclinicChildName === '' || this.baseParaclinicChild.paraclinicChildName === null)
    {
      this.notificationService.toastMessage(EnumMessageType.danger, 'خطا', 'لطفا نام پاراکلینیک را وارد کنید');
    }

    else
    {
      this.createBaseParaclinicChild();
    }
  }


  createBaseParaclinicChild() {
    this.makeResponse(this.baseParaclinicChildService.createtBaseParaclinicChild(this.baseParaclinicChild), true, resultObject => {
      console.log('موقع ثبت پزشک');
      console.log(resultObject.result);
      if (resultObject !== null && resultObject.result !== null) {
        this.notificationService.toastMessage(EnumMessageType.success, 'عملیات موفق', 'ثبت با موفقیت انجام شد');
        this.baseParaclinicChildService.subjectRefereshBaseParaclinicChild.next(true);
        this.registerForm.reset();

        $('#NewBaseParaclinicChild').modal('hide');

      }
    });

  }


  valueChangeParaclinicType(value: any) {
    this.baseParaclinicChild.paraclinicChildType = value;
  }

  valueChangeCompany(value: any) {
    this.baseParaclinicChild.baseCompanyId = value;
  }
}
