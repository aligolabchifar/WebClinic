import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PatientDetailBaseComponent} from '../../../patient-detail-base/patient-detail-base.component';
import {BaseInsuranceDto} from '../../../../../../model/Base/Insurance/base-insurance-dto';
import {BaseInsuranceParaclinicChildModelDto} from '../../../../../../model/Base/InsuranceParaclinicChild/base-insurance-paraclinic-child-model-dto';
import {NgForm} from '@angular/forms';
import {BaseInsuranceParaclinicChildService} from '../../../../../../controller/Base/InsuranceParaclinicChild/base-insurance-paraclinic-child.service';
import {EnumMessageType} from '../../../../../../controller/general/notification.service';
import {BaseInsuranceListModelDto} from '../../../../../../model/Base/Insurance/base-insurance-list-model-dto';
import {BaseInsuranceService} from '../../../../../../controller/Base/Insurance/base-insurance.service';
import {BaseInsuranceFilterDto} from '../../../../../../model/filter/base-insurance-filter-dto';
import {BaseCertificateTypeService} from '../../../../../../controller/Base/Certificate/base-certificate-type.service';
import {BaseCertificateTypeListModelDto} from '../../../../../../model/Base/Certificate/base-certificate-type-list-model-dto';
import {CertificateFilterDto} from '../../../../../../model/filter/certificate-filter-dto';
import {BaseUserModelDto} from '../../../../../../model/Base/User/base-user-model-dto';
declare var $: any;

@Component({
  selector: 'app-new-base-insurance-paraclinic-child',
  templateUrl: './new-base-insurance-paraclinic-child.component.html',
  styleUrls: ['./new-base-insurance-paraclinic-child.component.css']
})
export class NewBaseInsuranceParaclinicChildComponent extends PatientDetailBaseComponent implements OnInit {

  @Input() baseInsuranceParaclinicChild: BaseInsuranceParaclinicChildModelDto;
  @ViewChild('f') registerForm: NgForm;
  public lstBaseInsuranceList: Array<BaseInsuranceListModelDto>;
  baseInsuranceFilterDto = new BaseInsuranceFilterDto();
  baseCertificateTypeListModelDto: Array<BaseCertificateTypeListModelDto>;
  certificateFilterDto = new CertificateFilterDto();
  userInfo: BaseUserModelDto;
  public listItems: Array<{ text: string, value: number }> = [];

  constructor(private baseInsuranceParaclinicChildService: BaseInsuranceParaclinicChildService, private baseInsuranceService: BaseInsuranceService,
              private baseCertificateTypeService: BaseCertificateTypeService
              ) {
    super();
  }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('sorenTeb-user-storage'));

    this.refereshInsurance();
    this.refereshCertificate();

    if (this.userInfo !== undefined && this.userInfo !== null && this.userInfo.id !== 0) {
      {
        for (const item of this.userInfo.baseUserParaclinicChildModel) {

          this.listItems.push({text: item.paraclinicChildName, value: item.baseParaclinicChildId});
        }
      }
    }


  }

  refereshCertificate() {
    this.makeResponse(this.baseCertificateTypeService.getAllBaseCertificateTypeFirst(this.certificateFilterDto), true, resultObject => {
      if (resultObject.results) {
        this.baseCertificateTypeListModelDto = resultObject.results;

        console.log('لیست تعرفه ها');
        console.log(this.baseCertificateTypeListModelDto);
      }
    });
  }

  createBaseInsuranceParaclinic() {



    this.makeResponse(this.baseInsuranceParaclinicChildService.createtBaseInsuranceCertificate(this.baseInsuranceParaclinicChild), true, resultObject => {
      console.log('موقع ثبت بیمه');
      console.log(resultObject.result);
      if (resultObject !== null && resultObject.result !== null) {
        this.notificationService.toastMessage(EnumMessageType.success, 'عملیات موفق', 'ثبت با موفقیت انجام شد');
        this.baseInsuranceParaclinicChildService.subjectRefereshInsuranceParaclinicChild.next(true);
        this.registerForm.reset();

        $('#NewBaseInsuranceParaclinicChild').modal('hide');

      }
    });

  }


  refereshInsurance() {
    this.makeResponse(this.baseInsuranceService.getAllBaseInsuranceFirst(this.baseInsuranceFilterDto), true, resultObject => {
      if (resultObject.results) {
        this.lstBaseInsuranceList = resultObject.results;
      }
    });
  }


  onSubmit() {
    this.createBaseInsuranceParaclinic();
  }

  valueChangeInsurance(e) {

    console.log('بیمه انتخاب شده');
    console.log(e);
    this.baseInsuranceParaclinicChild.baseInsuranceId = e;


  }

  valueCertificateTypeId(e)
  {
    console.log('تعرفه انتخاب شده');
    console.log(e);
    this.baseInsuranceParaclinicChild.certificateTypeId = e;
  }

  valueCertificateTypeIdFree(e) {
    console.log('تعرفه آزاد انتخاب شده');
    console.log(e);
    this.baseInsuranceParaclinicChild.certificateTypeIdFree = e;
  }

  valueChangeParaclinic(e) {
    this.baseInsuranceParaclinicChild.baseParaclinicChildId = e;
  }
}
