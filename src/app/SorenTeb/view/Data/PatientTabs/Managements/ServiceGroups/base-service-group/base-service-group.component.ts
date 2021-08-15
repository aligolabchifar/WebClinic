import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PatientDetailBaseComponent} from '../../../patient-detail-base/patient-detail-base.component';
import {EnumMessageType} from '../../../../../../controller/general/notification.service';
import {NgForm} from '@angular/forms';
import {ReceptionListReceptionServiceModelDto} from '../../../../../../model/Data/Reception/reception-list-reception-service-model-dto';
import {BaseServiceGroupListModelDto} from '../../../../../../model/Base/BaseService/base-service-group-list-model-dto';
import {BaseInsuranceService} from '../../../../../../controller/Base/Insurance/base-insurance.service';
import {BaseServiceGroupService} from '../../../../../../controller/Base/BaseServices/base-service-group.service';
import {BaseServiceGroupFilterDto} from '../../../../../../model/filter/base-service-group-filter-dto';
import {BaseServiceGroupDto} from '../../../../../../model/Base/BaseService/base-service-group-dto';
import {ActivatedRoute, Params} from '@angular/router';
import {BaseServiceGroupModelDto} from '../../../../../../model/Base/BaseService/base-service-group-model-dto';
import {DataStateChangeEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {SortDescriptor, State} from '@progress/kendo-data-query';
import {BaseServiceRoutinDetailMainListModelDto} from '../../../../../../model/Base/BaseService/base-service-routin-detail-main-list-model-dto';
declare var $: any;
@Component({
  selector: 'app-base-service-group',
  templateUrl: './base-service-group.component.html',
  styleUrls: ['./base-service-group.component.css']
})
export class BaseServiceGroupComponent extends PatientDetailBaseComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  @Input() baseServiceGroupDto: BaseServiceGroupModelDto;
  public serviceGroup: any;
  baseServiceGroupFilterDto = new BaseServiceGroupFilterDto();


  lstServciceGroupList: Array<BaseServiceGroupListModelDto>;

  public cId: number;
  // public gridData: GridDataResult;
  public buttonCount = 5;
  public info = true;
  public type: 'numeric' | 'input' = 'numeric';
  public pageSizes = true;
  public previousNext = true;
  public pageSize = 5;
  public skip = 0;
  public sort: SortDescriptor[];
  public state: State;


  constructor(private baseServiceGroupService: BaseServiceGroupService, private activatedRoute: ActivatedRoute)
  {
    super();

  }



  ngOnInit(): void {






    console.log('گروه سرویس ها');
    console.log(this.baseServiceGroupDto);



  }










  createServiceGroup() {



    this.makeResponse(this.baseServiceGroupService.createBaseServiceGroup(this.baseServiceGroupDto), true, resultObject => {
      console.log(resultObject);
      if (resultObject !== null || resultObject.result != null) {
        this.notificationService.toastMessage(EnumMessageType.success, 'عملیات موفق', 'ثبت با موفقیت انجام شد');
        this.baseServiceGroupService.subjectRefereshServiceGroup.next(true);
        this.registerForm.reset();
        $('#NewGroupList').modal('hide');

      }
    });

  }

  onSubmit() {
    if (this.baseServiceGroupDto.baseServiceGroupName === '' || this.baseServiceGroupDto.baseServiceGroupName === null)
    {
      this.notificationService.toastMessage(EnumMessageType.danger, 'خطا', 'لطفا نام گروه سرویس را انتخاب کنید');
    }
    else
    {
      this.createServiceGroup();
    }

  }


}
