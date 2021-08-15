import { Component, OnInit } from '@angular/core';
import {PatientDetailBaseComponent} from '../../../../patient-detail-base/patient-detail-base.component';
import {BaseRoutinListModelDto} from '../../../../../../../model/Base/Routin/base-routin-list-model-dto';
import {SortDescriptor, State} from '@progress/kendo-data-query';
import {DataStateChangeEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {BaseUserModelDto} from '../../../../../../../model/Base/User/base-user-model-dto';
import {BaseRoutinFilterDto} from '../../../../../../../model/filter/base-routin-filter-dto';
import {BaseServiceRoutinService} from '../../../../../../../controller/Base/Routin/base-service-routin.service';
declare var $: any;

@Component({
  selector: 'app-base-service-routin-list',
  templateUrl: './base-service-routin-list.component.html',
  styleUrls: ['./base-service-routin-list.component.css']
})
export class BaseServiceRoutinListComponent  extends PatientDetailBaseComponent implements OnInit {

  baseRoutinListModelDto: Array<BaseRoutinListModelDto>;
  baseRoutin = new BaseRoutinListModelDto();

  baseRoutinFilterDto = new BaseRoutinFilterDto();
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
  gridData: GridDataResult = {data: this.baseRoutinListModelDto, total: this.totalListRowCount};
  // @ts-ignore
  public state: State = {skip: 0, take: 5, sort: this.sort, filter: {logic: 'and', filters: []}};


  userInfo: BaseUserModelDto;




  constructor(private baseServiceRoutinService: BaseServiceRoutinService) {
    super();
  }

  ngOnInit(): void {
    this.state = {skip: 0, take: 5, sort: this.sort};

    this.refereshRoutin();


    this.baseServiceRoutinService.subjectRefereshBaseServiceRoutin.subscribe(isRefresh => {
      if (isRefresh === true) {
        this.refereshRoutin();

      }
    });


    this.baseServiceRoutinService.subjectNewBaseServiceRoutin.subscribe(isRefresh => {
      if (isRefresh === true) {
        console.log('ایجاد  روتین جدید');

        this.baseRoutin = new BaseRoutinListModelDto();

        $('#NewBaseRoutin').modal('show');

      }
    });
  }


  refereshRoutin() {
    this.makeResponse(this.baseServiceRoutinService.getAllBaseServiceRoutin(this.baseRoutinFilterDto), true, resultObject => {

      if (resultObject.results) {
        this.baseRoutinListModelDto = resultObject.results;
        this.gridData.data = this.baseRoutinListModelDto;
        this.gridData.total = resultObject.totalRows;
        this.totalListRowCount = resultObject.totalRows;
        this.maxPageRows = resultObject.maxPageRows;
        // this.gridData.data = this.baseServiceGroupListModelDto.slice(this.skip, this.skip + this.pageSize);
        console.log('لیست روتین ها ');
        console.log(this.baseRoutinListModelDto);
      }
    });
  }


  dataStateChange(state: DataStateChangeEvent) {
    this.state.skip = state.skip;
    this.state.sort = state.sort;
    this.gridData.data = this.baseRoutinListModelDto.slice(this.skip, this.skip + this.pageSize);
    this.baseRoutinFilterDto.pageNumber = ((this.skip / this.pageSize) + 1).toString();
    // this.gridData.data = this.baseServiceGroupListModelDto;
  }

  public pageChange({skip, take}: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.gridData.data = this.baseRoutinListModelDto;
    this.gridData.data = this.baseRoutinListModelDto.slice(this.skip, this.skip + this.pageSize);
    // this.refereshServiceGroup();

  }

  editBaseRoutin(baseRoutinListModelDto: BaseRoutinListModelDto) {
    this.baseRoutin = baseRoutinListModelDto;

    $('#NewBaseRoutin').modal('show');
  }

}
