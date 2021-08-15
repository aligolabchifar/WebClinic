import { Component, OnInit } from '@angular/core';
import {PatientDetailBaseComponent} from '../../../patient-detail-base/patient-detail-base.component';
import {BaseInsuranceService} from '../../../../../../controller/Base/Insurance/base-insurance.service';
import {BaseInsuranceDto} from '../../../../../../model/Base/Insurance/base-insurance-dto';
import {BaseInsuranceFilterDto} from '../../../../../../model/filter/base-insurance-filter-dto';
import {SortDescriptor, State} from '@progress/kendo-data-query';
import {DataStateChangeEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
declare var $: any;

@Component({
  selector: 'app-base-insuranc-list',
  templateUrl: './base-insuranc-list.component.html',
  styleUrls: ['./base-insuranc-list.component.css']
})
export class BaseInsurancListComponent extends PatientDetailBaseComponent implements OnInit {

  baseInsuranceDto: Array<BaseInsuranceDto>;
  baseInsuranceFilterDto = new BaseInsuranceFilterDto();
  baseInsuranceFirst = new BaseInsuranceDto();

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
  gridData: GridDataResult = {data: this.baseInsuranceDto, total: this.totalListRowCount};
  // @ts-ignore
  public state: State = {skip: 0, take: 5, sort: this.sort, filter: {logic: 'and', filters: []}};

  constructor(private baseInsuranceService: BaseInsuranceService) {
    super();
  }

  ngOnInit(): void {
    this.state = {skip: 0, take: 5, sort: this.sort};
    this.refereshInsurance();


    this.baseInsuranceService.subjectRefereshBaseInsurance.subscribe(isRefresh => {
      if (isRefresh === true) {
        this.refereshInsurance();

      }
    });


    this.baseInsuranceService.subjectNewBaseInsurance.subscribe(isRefresh => {
      if (isRefresh === true) {
        console.log('ایجاد  بیمه جدید');

        this.baseInsuranceFirst = new BaseInsuranceDto();

        $('#NewBaseInsurance').modal('show');

      }
    });


  }


  refereshInsurance() {
    this.makeResponse(this.baseInsuranceService.getAllBaseInsuranceFirst(this.baseInsuranceFilterDto), true, resultObject => {
      if (resultObject.results) {
        this.baseInsuranceDto = resultObject.results;
        this.gridData.data = this.baseInsuranceDto;
        this.gridData.total = resultObject.totalRows;
        this.totalListRowCount = resultObject.totalRows;
        this.maxPageRows = resultObject.maxPageRows;
        console.log('لیست بیمه ها');
        console.log(this.baseInsuranceDto);
      }
    });
  }


  dataStateChange(state: DataStateChangeEvent) {
    this.state.skip = state.skip;
    this.state.sort = state.sort;
    this.gridData.data = this.baseInsuranceDto.slice(this.skip, this.skip + this.pageSize);
    this.baseInsuranceFilterDto.pageNumber = ((this.skip / this.pageSize) + 1).toString();
    // this.gridData.data = this.baseServiceGroupListModelDto;
  }

  public pageChange({skip, take}: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.gridData.data = this.baseInsuranceDto;
    this.gridData.data = this.baseInsuranceDto.slice(this.skip, this.skip + this.pageSize);
    // this.refereshServiceGroup();

  }

  editBaseInsurance(baseInsurance: BaseInsuranceDto) {
    this.baseInsuranceFirst = baseInsurance;
    console.log('ویرایش بیمه');
    console.log(this.baseInsuranceFirst);
    $('#NewBaseInsurance').modal('show');
  }
}
