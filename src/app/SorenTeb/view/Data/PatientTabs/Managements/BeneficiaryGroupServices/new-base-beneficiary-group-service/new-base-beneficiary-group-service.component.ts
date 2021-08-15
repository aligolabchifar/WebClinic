import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {PatientDetailBaseComponent} from '../../../patient-detail-base/patient-detail-base.component';
import {BaseBeneficiaryGroupServiceListModelDto} from '../../../../../../model/Base/BeneficiaryGroups/base-beneficiary-group-service-list-model-dto';
import {NgForm} from '@angular/forms';
import {BaseCompanyFilterDto} from '../../../../../../model/Base/Paraclinic/base-company-filter-dto';
import {EnumMessageType} from '../../../../../../controller/general/notification.service';
// tslint:disable-next-line:max-line-length
import {BaseBeneficiaryGroupServiceService} from '../../../../../../controller/Base/BeneficiaryGroup/base-beneficiary-group-service.service';
import {BeneficiaryFilterDto} from '../../../../../../model/filter/beneficiary-filter-dto';
import {BaseBeneficiaryService} from '../../../../../../controller/Base/Beneficiary/base-beneficiary.service';
import {BaseParaclinicChildService} from '../../../../../../controller/Base/ParaclinicChild/base-paraclinic-child.service';
import {BaseBeneficiaryParaclinicChildService} from '../../../../../../controller/Base/Beneficiary/base-beneficiary-paraclinic-child.service';
import {BaseBeneficiaryParaclinicChild2ListModelDto} from '../../../../../../model/Base/Beneficiary/base-beneficiary-paraclinic-child2-list-model-dto';
import {ParaclinicChildFilterDto} from '../../../../../../model/filter/paraclinic-child-filter-dto';
import {BaseServiceService} from '../../../../../../controller/Base/BaseServices/base-service.service';
import {BaseServiceGroupFilterDto} from '../../../../../../model/filter/base-service-group-filter-dto';
import {BaseServiceGroupService} from '../../../../../../controller/Base/BaseServices/base-service-group.service';

declare var $: any;

@Component({
  selector: 'app-new-base-beneficiary-group-service',
  templateUrl: './new-base-beneficiary-group-service.component.html',
  styleUrls: ['./new-base-beneficiary-group-service.component.css']
})
export class NewBaseBeneficiaryGroupServiceComponent extends PatientDetailBaseComponent implements OnInit , OnChanges{
  @Input() baseBeneficiaryGroupService: BaseBeneficiaryGroupServiceListModelDto;
  @Input()selectParaclinicChildId: number;
  @ViewChild('f') registerForm: NgForm;
  lstParaclinicList: any;
  baseBeneficiaryParaclinicChild2ListModel = Array<BaseBeneficiaryParaclinicChild2ListModelDto>();
  beneficiaryFilterDto = new BeneficiaryFilterDto();
  paraclinicChildFilterDto = new ParaclinicChildFilterDto();
  baseServiceGroupFilterDto = new BaseServiceGroupFilterDto();
  public lstServciceGroupList: any;
  constructor(private  baseBeneficiaryGroupServiceService: BaseBeneficiaryGroupServiceService, private  baseBeneficiaryService: BaseBeneficiaryService
    ,         private baseParaclinicChildService: BaseParaclinicChildService, private baseBeneficiaryParaclinicChildService: BaseBeneficiaryParaclinicChildService
  ,           private  baseServiceGroup: BaseServiceGroupService) {
    super();
  }

  ngOnInit(): void {

    this.beneficiaryFilterDto.baseParaclinicChildId = this.selectParaclinicChildId;
    this.baseServiceGroupFilterDto.baseParaclinicChildId = this.selectParaclinicChildId;
    this.refereshParaclinic();

    this.refereshBeneficiaryParaclinicChildActivity();
    this.refereshServiceGroup();
  }


  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'selectParaclinicChildId') {
        this.beneficiaryFilterDto.baseParaclinicChildId = this.selectParaclinicChildId;
        this.baseServiceGroupFilterDto.baseParaclinicChildId = this.selectParaclinicChildId;
        this.refereshParaclinic();

        this.refereshBeneficiaryParaclinicChildActivity();
        this.refereshServiceGroup();
      }
    }
  }

  refereshServiceGroup() {
    this.makeResponse(this.baseServiceGroup.getAllBaseServiceGroup(this.baseServiceGroupFilterDto), true, resultObject => {

      if (resultObject.results) {
        this.lstServciceGroupList = resultObject.results;


      }
    });
  }

  refereshParaclinic() {
    this.paraclinicChildFilterDto.isDisabled = false;
    this.makeResponse(this.baseParaclinicChildService.getAllParaclinicChild(this.paraclinicChildFilterDto), true, resultObject => {
      if (resultObject.results) {
        this.lstParaclinicList = resultObject.results;
        console.log('تخصص های قابل دسترسی');
        console.log(resultObject.results);

      }
    });
  }


  refereshBeneficiaryParaclinicChildActivity() {
    this.makeResponse(this.baseBeneficiaryParaclinicChildService.getAllBeneficiaryParaclinicChild2(this.beneficiaryFilterDto), true, resultObject => {
      if (resultObject.results) {
        this.baseBeneficiaryParaclinicChild2ListModel = resultObject.results;
        this.totalListRowCount = resultObject.totalRows;
        // this.gridData.data = this.baseServiceGroupListModelDto.slice(this.skip, this.skip + this.pageSize);
        console.log('لیست دسترسی های پاراکلینیک ');
        console.log(this.baseBeneficiaryParaclinicChild2ListModel);
      }
    });
  }



  createBaseParaclinicChild() {
    this.makeResponse(this.baseBeneficiaryGroupServiceService.createtBaseBeneficiaryGroupService(this.baseBeneficiaryGroupService), true, resultObject => {
      console.log('موقع ثبت پزشک');
      console.log(resultObject.result);
      if (resultObject !== null && resultObject.result !== null) {
        this.notificationService.toastMessage(EnumMessageType.success, 'عملیات موفق', 'ثبت با موفقیت انجام شد');
        this.baseBeneficiaryGroupServiceService.subjectRefereshBaseBeneficiaryGroupService.next(true);
        this.registerForm.reset();

        $('#NewBaseBeneficiaryGroupService').modal('hide');

      }
    });

  }

  onSubmit() {
    console.log('پزشک بر اساس گروه');
    console.log(this.baseBeneficiaryGroupService);
    //
    // if (this.baseBeneficiaryGroupService.paraclinicChildName === '' || this.baseParaclinicChild.paraclinicChildName === null)
    // {
    //   this.notificationService.toastMessage(EnumMessageType.danger, 'خطا', 'لطفا نام پاراکلینیک را وارد کنید');
    // }
    //
    // else
    // {
    this.createBaseParaclinicChild();
    // }
  }

  valueBaseBeneficiaryId(e) {
    console.log('پزشک کد');
    console.log(e);

    this.baseBeneficiaryGroupService.baseBeneficiaryId = e;
  }

  valueChangeParaclinicChild(e) {

    this.beneficiaryFilterDto.baseParaclinicChildId = e;
    this.baseServiceGroupFilterDto.baseParaclinicChildId = e;

    this.refereshBeneficiaryParaclinicChildActivity();
    this.refereshServiceGroup();
  }

  ShowBeneficiary() {
    // console.log('شناسه پاراکلینیک');
    // console.log(this.selectParaclinicChildId);
    // this.refereshBeneficiaryParaclinicChildActivity();
  }

  valueGroupId(e) {
    console.log('گروه سرویس');
    console.log(e);
    this.baseBeneficiaryGroupService.baseServiceGroupId = e;
  }
}
