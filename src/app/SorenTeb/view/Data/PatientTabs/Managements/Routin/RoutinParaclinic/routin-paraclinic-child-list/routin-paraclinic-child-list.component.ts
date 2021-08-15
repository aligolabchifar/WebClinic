import { Component, OnInit } from '@angular/core';
import {PatientDetailBaseComponent} from '../../../../patient-detail-base/patient-detail-base.component';
import {BaseServiceRoutinParaclinicChildListModelDto} from '../../../../../../../model/Base/Routin/base-service-routin-paraclinic-child-list-model-dto';
import {SortDescriptor, State} from '@progress/kendo-data-query';
import {DataStateChangeEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {RoutinParaclinicChildService} from '../../../../../../../controller/Base/Routin/routin-paraclinic-child.service';
import {RoutinParaclinicFilterDto} from '../../../../../../../model/filter/routin-paraclinic-filter-dto';
import {BaseRoutinListModelDto} from '../../../../../../../model/Base/Routin/base-routin-list-model-dto';
declare var $: any;

@Component({
  selector: 'app-routin-paraclinic-child-list',
  templateUrl: './routin-paraclinic-child-list.component.html',
  styleUrls: ['./routin-paraclinic-child-list.component.css']
})
export class RoutinParaclinicChildListComponent extends PatientDetailBaseComponent implements OnInit {

  baseServiceRoutinParaclinicChildListModelDto: Array<BaseServiceRoutinParaclinicChildListModelDto>;
  baseServiceRoutinParaclinicChild = new BaseServiceRoutinParaclinicChildListModelDto();
  routinParaclinicFilterDto = new RoutinParaclinicFilterDto();
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
  gridData: GridDataResult = {data: this.baseServiceRoutinParaclinicChildListModelDto, total: this.totalListRowCount};
  // @ts-ignore
  public state: State = {skip: 0, take: 5, sort: this.sort, filter: {logic: 'and', filters: []}};





  constructor(private routinParaclinicChildService: RoutinParaclinicChildService) {
    super();


  }

  ngOnInit(): void {
    this.state = {skip: 0, take: 5, sort: this.sort};
    this.refereshRoutinParaclinic();

    this.routinParaclinicChildService.subjectRefereshRoutinParaclinicChild.subscribe(isRefresh => {
      if (isRefresh === true) {
        this.refereshRoutinParaclinic();

      }
    });


    this.routinParaclinicChildService.subjectNewRoutinParaclinicChild.subscribe(isRefresh => {
      if (isRefresh === true) {
        console.log('ایجاد  روتین جدید');

        this.baseServiceRoutinParaclinicChild = new BaseServiceRoutinParaclinicChildListModelDto();

        $('#NewRoutinParaclinicChild').modal('show');

      }
    });


  }


  refereshRoutinParaclinic() {
    this.makeResponse(this.routinParaclinicChildService.getAllRoutinParaclinicChild(this.routinParaclinicFilterDto), true, resultObject => {

      if (resultObject.results) {
        this.baseServiceRoutinParaclinicChildListModelDto = resultObject.results;
        this.gridData.data = this.baseServiceRoutinParaclinicChildListModelDto;
        this.gridData.total = resultObject.totalRows;
        this.totalListRowCount = resultObject.totalRows;
        this.maxPageRows = resultObject.maxPageRows;
        // this.gridData.data = this.baseServiceGroupListModelDto.slice(this.skip, this.skip + this.pageSize);
        console.log('لیست روتین پاراکلینیک ');
        console.log(this.baseServiceRoutinParaclinicChildListModelDto);
      }
    });
  }


  dataStateChange(state: DataStateChangeEvent) {
    this.state.skip = state.skip;
    this.state.sort = state.sort;
    this.gridData.data = this.baseServiceRoutinParaclinicChildListModelDto.slice(this.skip, this.skip + this.pageSize);
    this.routinParaclinicFilterDto.pageNumber = ((this.skip / this.pageSize) + 1).toString();
    // this.gridData.data = this.baseServiceGroupListModelDto;
  }

  public pageChange({skip, take}: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.gridData.data = this.baseServiceRoutinParaclinicChildListModelDto;
    this.gridData.data = this.baseServiceRoutinParaclinicChildListModelDto.slice(this.skip, this.skip + this.pageSize);
    // this.refereshServiceGroup();

  }

  editRoutinParaclinicChild(baseServiceRoutinParaclinicChild: BaseServiceRoutinParaclinicChildListModelDto) {
    this.baseServiceRoutinParaclinicChild = baseServiceRoutinParaclinicChild;

    $('#NewRoutinParaclinicChild').modal('show');
  }

}
