import { Component, OnInit } from '@angular/core';
import {PatientDetailBaseComponent} from '../../../patient-detail-base/patient-detail-base.component';
import {BaseServiceGroupListTotalModelDto} from '../../../../../../model/Base/BaseService/base-service-group-list-total-model-dto';
import {BaseServiceGroupListModelDto} from '../../../../../../model/Base/BaseService/base-service-group-list-model-dto';
import {BaseServiceGroupListFullModelDto} from '../../../../../../model/Base/BaseService/base-service-group-list-full-model-dto';
import {BaseServiceGroupFilterDto} from '../../../../../../model/filter/base-service-group-filter-dto';
import {SortDescriptor, State} from '@progress/kendo-data-query';
import {DataStateChangeEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {BaseServiceGroupService} from '../../../../../../controller/Base/BaseServices/base-service-group.service';
import {BaseServiceGroupModelDto} from '../../../../../../model/Base/BaseService/base-service-group-model-dto';
import {BaseServiceGroupParaclinicChildService} from '../../../../../../controller/Base/BaseServices/base-service-group-paraclinic-child.service';
import {BaseUserModelDto} from '../../../../../../model/Base/User/base-user-model-dto';
import {EnumMessageType} from '../../../../../../controller/general/notification.service';

declare var $: any;

@Component({
  selector: 'app-group-service-paraclinic-child',
  templateUrl: './group-service-paraclinic-child.component.html',
  styleUrls: ['./group-service-paraclinic-child.component.css']
})
export class GroupServiceParaclinicChildComponent extends PatientDetailBaseComponent implements OnInit {
  baseServiceGroupListModelDto: Array<BaseServiceGroupListFullModelDto>;
  baseServiceGroupFilterDto = new BaseServiceGroupFilterDto();
  public buttonCount = 5;
  public info = true;
  public type: 'numeric' | 'input' = 'numeric';
  public pageSizes = true;
  public previousNext = true;
  public pageSize = 5;
  public skip = 0;
  public sort: SortDescriptor[];
  // public state: State;
  maxPageRows = 0;
  // @ts-ignore
  gridData: GridDataResult = {data: this.baseServiceGroupListModelDto, total: this.totalListRowCount};
  // @ts-ignore
  public state: State = {skip: 0, take: 5, sort: this.sort, filter: {logic: 'and', filters: []}};
  baseServiceGroupDto = new BaseServiceGroupModelDto();

  userInfo: BaseUserModelDto;

  constructor(private baseServiceGroupService: BaseServiceGroupService, private baseServiceGroupParaclinicChildService: BaseServiceGroupParaclinicChildService) { super(); }

  ngOnInit(): void {
    this.state = {skip: 0, take: 5, sort: this.sort};
    this. refereshServiceGroup();





    this.baseServiceGroupParaclinicChildService.subjectNewServiceGroupParaclinic.subscribe(isRefresh => {
      if (isRefresh === true) {
        console.log('ایجاد گروه پاراکلینیک');

        this.baseServiceGroupDto = new BaseServiceGroupModelDto();

        $('#NewGroupParaclinicChild').modal('show');

      }
    });


    this.baseServiceGroupParaclinicChildService.subjectRefereshServiceGroupParaclinic.subscribe(isRefresh => {
      if (isRefresh === true) {
        this.refereshServiceGroup();

      }
    });


  }


  refereshServiceGroup() {
    this.makeResponse(this.baseServiceGroupService.getAllBaseServiceGroupFull(this.baseServiceGroupFilterDto), true, resultObject => {

      if (resultObject.results) {
        this.baseServiceGroupListModelDto = resultObject.results;
        this.gridData.data = this.baseServiceGroupListModelDto;
        this.gridData.total = resultObject.totalRows;
        this.totalListRowCount = resultObject.totalRows;
        this.maxPageRows = resultObject.maxPageRows;
        // this.gridData.data = this.baseServiceGroupListModelDto.slice(this.skip, this.skip + this.pageSize);
        console.log('گروه سرویس');
        console.log(this.baseServiceGroupListModelDto);
      }
    });
  }


  dataStateChange(state: DataStateChangeEvent) {
    this.state.skip = state.skip;
    this.state.sort = state.sort;
    this.gridData.data = this.baseServiceGroupListModelDto.slice(this.skip, this.skip + this.pageSize);
    this.baseServiceGroupFilterDto.pageNumber = ((this.skip / this.pageSize) + 1).toString();
    // this.gridData.data = this.baseServiceGroupListModelDto;
  }

  public pageChange({skip, take}: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.gridData.data = this.baseServiceGroupListModelDto;
    this.gridData.data = this.baseServiceGroupListModelDto.slice(this.skip, this.skip + this.pageSize);
    // this.refereshServiceGroup();

  }


  editGroupService(baseServiceGroupModel: BaseServiceGroupModelDto) {
    console.log('مقدار سرویس پاراکلینیک برای ویرایش');
    console.log(baseServiceGroupModel);

    this.baseServiceGroupDto = baseServiceGroupModel;
    console.log('مقدار گروه سرویس ویرایش شده');
    console.log(this.baseServiceGroupDto);
    $('#NewGroupParaclinicChild').modal('show');
    this.refereshServiceGroup();
  }


  deleteServiceGroup() {
    this.makeResponse(this.baseServiceGroupParaclinicChildService.deleteServiceGroupParaclinic(this.baseServiceGroupDto), true, resultObject => {
      console.log(resultObject);
      if (resultObject !== null || resultObject.result != null) {
        this.notificationService.toastMessage(EnumMessageType.success, 'عملیات موفق', 'حذف اطلاعات با موفقیت انجام شد');
        this.refereshServiceGroup();
      }
    });
  }

  deleteGroupService(baseServiceGroupModel: BaseServiceGroupModelDto) {
    this.baseServiceGroupDto = baseServiceGroupModel;
    if (confirm('آیا برای حذف مطمئن هستید؟')) {
      this.deleteServiceGroup();
    }


  }
}
