import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {PatientDetailBaseComponent} from '../../../patient-detail-base/patient-detail-base.component';
import {BaseServiceGroupListModelDto} from '../../../../../../model/Base/BaseService/base-service-group-list-model-dto';
import {BaseServiceGroupService} from '../../../../../../controller/Base/BaseServices/base-service-group.service';
import {BaseServiceGroupFilterDto} from '../../../../../../model/filter/base-service-group-filter-dto';
import {DataStateChangeEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {SortDescriptor, State} from '@progress/kendo-data-query';
import {BaseServiceGroupListTotalModelDto} from '../../../../../../model/Base/BaseService/base-service-group-list-total-model-dto';
import {BaseServiceGroupModelDto} from '../../../../../../model/Base/BaseService/base-service-group-model-dto';
declare var $: any;

@Component({
  selector: 'app-base-service-group-list',
  templateUrl: './base-service-group-list.component.html',
  styleUrls: ['./base-service-group-list.component.css']
})
export class BaseServiceGroupListComponent extends PatientDetailBaseComponent implements OnInit {
  baseServiceGroupListModelDto: Array<BaseServiceGroupListTotalModelDto>;
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
   // baseServiceGroupDto: BaseServiceGroupModelDto;
  // @ts-ignore
  gridData: GridDataResult = {data: this.baseServiceGroupListModelDto, total: this.totalListRowCount};
  // @ts-ignore
  public state: State = {skip: 0, take: 5, sort: this.sort, filter: {logic: 'and', filters: []}};

  baseServiceGroupDto = new BaseServiceGroupModelDto();
  constructor(private baseServiceGroupService: BaseServiceGroupService) {
    super();
  }

  ngOnInit(): void {
    this.state = {skip: 0, take: 5, sort: this.sort};

    this.refereshServiceGroup();



    this.baseServiceGroupService.subjectRefereshServiceGroup.subscribe(isRefresh => {
      if (isRefresh === true) {
        this.refereshServiceGroup();

      }
    });



    this.baseServiceGroupService.subjectNewServiceGroup.subscribe(isRefresh => {
      if (isRefresh === true) {
        console.log('ایجاد گروه سرویس جدید');

        this.baseServiceGroupDto = new BaseServiceGroupModelDto();

        $('#NewGroupList').modal('show');

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


  refereshServiceGroup() {
    this.makeResponse(this.baseServiceGroupService.getAllBaseServiceGroupTotal(this.baseServiceGroupFilterDto), true, resultObject => {

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


  editGroupService(baseServiceGroup: BaseServiceGroupModelDto) {
this.baseServiceGroupDto = baseServiceGroup;
console.log('مقدار گروه سرویس ویرایش شده');
console.log(this.baseServiceGroupDto);
$('#NewGroupList').modal('show');
  }

  AddServiceGroup() {

  }
}
