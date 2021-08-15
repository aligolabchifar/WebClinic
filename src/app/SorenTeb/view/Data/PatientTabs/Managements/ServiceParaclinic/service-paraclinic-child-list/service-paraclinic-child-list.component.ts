import { Component, OnInit } from '@angular/core';
import {PatientDetailBaseComponent} from '../../../patient-detail-base/patient-detail-base.component';
import {BaseServiceGroupListTotalModelDto} from '../../../../../../model/Base/BaseService/base-service-group-list-total-model-dto';
import {BaseServiceGroupFilterDto} from '../../../../../../model/filter/base-service-group-filter-dto';
import {BaseServiceParaclinicChildListModelDto} from '../../../../../../model/Base/ServiceParaclinic/base-service-paraclinic-child-list-model-dto';
import {CaliforniaFilterDto} from '../../../../../../model/filter/california-filter-dto';
import {SortDescriptor, State} from '@progress/kendo-data-query';
import {DataStateChangeEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {BaseServiceParaclinicChildService} from '../../../../../../controller/Base/BaseServices/base-service-paraclinic-child.service';
import {BaseServiceParaclinicFilterDto} from '../../../../../../model/filter/base-service-paraclinic-filter-dto';
import {BaseServiceGroupModelDto} from '../../../../../../model/Base/BaseService/base-service-group-model-dto';
import {BaseServiceFirstListModelDto} from '../../../../../../model/Base/BaseService/base-service-first-list-model-dto';
declare var $: any;

@Component({
  selector: 'app-service-paraclinic-child-list',
  templateUrl: './service-paraclinic-child-list.component.html',
  styleUrls: ['./service-paraclinic-child-list.component.css']
})
export class ServiceParaclinicChildListComponent extends PatientDetailBaseComponent implements OnInit {

  baseServiceParaclinicChildListModelDto: Array<BaseServiceParaclinicChildListModelDto>;
  baseServiceParaclinicChild = new BaseServiceParaclinicChildListModelDto();
  baseServiceParaclinicFilterDto = new  BaseServiceParaclinicFilterDto();
  californiaFilterDto = new CaliforniaFilterDto();

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
  gridData: GridDataResult = {data: this.baseServiceParaclinicChildListModelDto, total: this.totalListRowCount};
  // @ts-ignore
  public state: State = {skip: 0, take: 5, sort: this.sort, filter: {logic: 'and', filters: []}};


  constructor(private baseServiceParaclinicChildService: BaseServiceParaclinicChildService) {
    super();

  }

  ngOnInit(): void {
    this.state = {skip: 0, take: 5, sort: this.sort};
    this.refereshServiceParaclinic();
    this.baseServiceParaclinicChildService.subjectRefereshBaseServiceParaclinicChild.subscribe(isRefresh => {
      if (isRefresh === true) {
        this.refereshServiceParaclinic();

      }
    });

    this.baseServiceParaclinicChildService.subjectNewBaseServiceParaclinicChild.subscribe(isRefresh => {
      if (isRefresh === true) {
        console.log('ایجاد گروه سرویس جدید');

        this.baseServiceParaclinicChild = new BaseServiceParaclinicChildListModelDto();

        $('#NewBaseServiceParaclinicChild').modal('show');

      }
    });


  }


  refereshServiceParaclinic() {
    this.makeResponse(this.baseServiceParaclinicChildService.getAllBaseServiceParaclinicChild(this.baseServiceParaclinicFilterDto), true, resultObject => {

      if (resultObject.results) {
        this.baseServiceParaclinicChildListModelDto = resultObject.results;
        this.gridData.data = this.baseServiceParaclinicChildListModelDto;
        this.gridData.total = resultObject.totalRows;
        this.totalListRowCount = resultObject.totalRows;
        this.maxPageRows = resultObject.maxPageRows;
        // this.gridData.data = this.baseServiceGroupListModelDto.slice(this.skip, this.skip + this.pageSize);
        console.log('سرویس پاراکلینیک');
        console.log(this.baseServiceParaclinicChildListModelDto);
      }
    });
  }

  dataStateChange(state: DataStateChangeEvent) {
    this.state.skip = state.skip;
    this.state.sort = state.sort;
    this.gridData.data = this.baseServiceParaclinicChildListModelDto.slice(this.skip, this.skip + this.pageSize);
    this.baseServiceParaclinicFilterDto.pageNumber = ((this.skip / this.pageSize) + 1).toString();
    // this.gridData.data = this.baseServiceGroupListModelDto;
  }

  public pageChange({skip, take}: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.gridData.data = this.baseServiceParaclinicChildListModelDto;
    this.gridData.data = this.baseServiceParaclinicChildListModelDto.slice(this.skip, this.skip + this.pageSize);
    // this.refereshServiceGroup();

  }

  editBaseServiceParaclinicChild(ServiceParaclinicChildListModelDto: BaseServiceParaclinicChildListModelDto) {
    this.baseServiceParaclinicChild = ServiceParaclinicChildListModelDto;
    console.log('ویرایش سرویس');
    console.log(this.baseServiceParaclinicChild);
    $('#NewBaseServiceParaclinicChild').modal('show');
  }

}
