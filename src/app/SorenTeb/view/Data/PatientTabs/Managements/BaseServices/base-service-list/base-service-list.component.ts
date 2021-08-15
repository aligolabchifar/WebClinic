import { Component, OnInit } from '@angular/core';
import {PatientDetailBaseComponent} from '../../../patient-detail-base/patient-detail-base.component';
import {BaseServiceService} from '../../../../../../controller/Base/BaseServices/base-service.service';
import {SortDescriptor, State} from '@progress/kendo-data-query';
import {DataStateChangeEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {BaseServiceFirstListModelDto} from '../../../../../../model/Base/BaseService/base-service-first-list-model-dto';
import {BaseServiceFilterDto} from '../../../../../../model/filter/base-service-filter-dto';
declare var $: any;


@Component({
  selector: 'app-base-service-list',
  templateUrl: './base-service-list.component.html',
  styleUrls: ['./base-service-list.component.css']
})
export class BaseServiceListComponent extends PatientDetailBaseComponent implements OnInit {

  baseServiceFirstListModelDto: Array<BaseServiceFirstListModelDto>;
  baseServiceFirst = new BaseServiceFirstListModelDto();
  baseServiceFilterDto = new BaseServiceFilterDto();
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
  gridData: GridDataResult = {data: this.baseServiceFirstListModelDto, total: this.totalListRowCount};
  // @ts-ignore
  public state: State = {skip: 0, take: 5, sort: this.sort, filter: {logic: 'and', filters: []}};


  constructor(private baseServiceService: BaseServiceService) {
    super();

  }

  ngOnInit(): void {
    this.state = {skip: 0, take: 5, sort: this.sort};

    this.refereshBaseService();


    this.baseServiceService.subjectRefereshBaseService.subscribe(isRefresh => {
      if (isRefresh === true) {
        this.refereshBaseService();

      }
    });


    this.baseServiceService.subjectNewBaseService.subscribe(isRefresh => {
      if (isRefresh === true) {
        console.log('ایجاد  سرویس جدید');

        this.baseServiceFirst = new BaseServiceFirstListModelDto();

        $('#NewBaseService').modal('show');

      }
    });
  }

  refereshBaseService() {
    this.makeResponse(this.baseServiceService.getAllBaseServiceFirst(this.baseServiceFilterDto), true, resultObject => {

      if (resultObject.results) {
        this.baseServiceFirstListModelDto = resultObject.results;
        this.gridData.data = this.baseServiceFirstListModelDto;
        this.gridData.total = resultObject.totalRows;
        this.totalListRowCount = resultObject.totalRows;
        this.maxPageRows = resultObject.maxPageRows;
        // this.gridData.data = this.baseServiceGroupListModelDto.slice(this.skip, this.skip + this.pageSize);
        console.log('لیست سرویس ها  ');
        console.log(this.baseServiceFirstListModelDto);
      }
    });
  }


  dataStateChange(state: DataStateChangeEvent) {
    this.state.skip = state.skip;
    this.state.sort = state.sort;
    this.gridData.data = this.baseServiceFirstListModelDto.slice(this.skip, this.skip + this.pageSize);
    this.baseServiceFilterDto.pageNumber = ((this.skip / this.pageSize) + 1).toString();
    // this.gridData.data = this.baseServiceGroupListModelDto;
  }

  public pageChange({skip, take}: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.gridData.data = this.baseServiceFirstListModelDto;
    this.gridData.data = this.baseServiceFirstListModelDto.slice(this.skip, this.skip + this.pageSize);
    // this.refereshServiceGroup();

  }

  editBaseService(baseServiceFirstListModelDto: BaseServiceFirstListModelDto) {
    this.baseServiceFirst = baseServiceFirstListModelDto;
    console.log('ویرایش سرویس');
    console.log(this.baseServiceFirst);
    $('#NewBaseService').modal('show');
  }

}
