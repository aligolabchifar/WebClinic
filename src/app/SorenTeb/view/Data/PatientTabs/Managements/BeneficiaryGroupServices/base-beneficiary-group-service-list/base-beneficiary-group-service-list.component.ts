import { Component, OnInit } from '@angular/core';
import {PatientDetailBaseComponent} from '../../../patient-detail-base/patient-detail-base.component';
import {SortDescriptor, State} from '@progress/kendo-data-query';
import {DataStateChangeEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {BaseBeneficiaryGroupServiceListModelDto} from '../../../../../../model/Base/BeneficiaryGroups/base-beneficiary-group-service-list-model-dto';
import {BaseBeneficiaryGroupsFilterDto} from '../../../../../../model/filter/base-beneficiary-groups-filter-dto';
// tslint:disable-next-line:max-line-length
import {BaseBeneficiaryGroupServiceService} from '../../../../../../controller/Base/BeneficiaryGroup/base-beneficiary-group-service.service';
import {BaseParaclinicChildListModelDto} from '../../../../../../model/Base/Paraclinic/base-paraclinic-child-list-model-dto';
declare var $: any;

@Component({
  selector: 'app-base-beneficiary-group-service-list',
  templateUrl: './base-beneficiary-group-service-list.component.html',
  styleUrls: ['./base-beneficiary-group-service-list.component.css']
})
export class BaseBeneficiaryGroupServiceListComponent extends PatientDetailBaseComponent implements OnInit {

  baseBeneficiaryGroupServiceListModelDto: Array<BaseBeneficiaryGroupServiceListModelDto>;
  baseBeneficiaryGroupService = new BaseBeneficiaryGroupServiceListModelDto();
  baseBeneficiaryGroupsFilterDto = new BaseBeneficiaryGroupsFilterDto();
  selectParaclinicChildId: number;
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
  gridData: GridDataResult = {data: this.baseBeneficiaryGroupServiceListModelDto, total: this.totalListRowCount};
  // @ts-ignore
  public state: State = {skip: 0, take: 5, sort: this.sort, filter: {logic: 'and', filters: []}};





  constructor(private  baseBeneficiaryGroupServiceService: BaseBeneficiaryGroupServiceService) {
    super();
  }

  ngOnInit(): void {
    this.state = {skip: 0, take: 5, sort: this.sort};

    this.refereshBaseBeneficiaryGroupService();


    this.baseBeneficiaryGroupServiceService.subjectRefereshBaseBeneficiaryGroupService.subscribe(isRefresh => {
      if (isRefresh === true) {
        this.refereshBaseBeneficiaryGroupService();

      }
    });


    this.baseBeneficiaryGroupServiceService.subjectNewBaseBeneficiaryGroupService.subscribe(isRefresh => {
      if (isRefresh === true) {
        console.log('ایجاد  پزشک و گروه سرویس');

        this.baseBeneficiaryGroupService = new BaseBeneficiaryGroupServiceListModelDto();

        $('#NewBaseBeneficiaryGroupService').modal('show');

      }
    });

  }

  refereshBaseBeneficiaryGroupService() {
    this.makeResponse(this.baseBeneficiaryGroupServiceService.getAllBaseBeneficiaryGroupService(this.baseBeneficiaryGroupsFilterDto), true, resultObject => {

      if (resultObject.results) {
        this.baseBeneficiaryGroupServiceListModelDto = resultObject.results;
        this.gridData.data = this.baseBeneficiaryGroupServiceListModelDto;
        this.gridData.total = resultObject.totalRows;
        this.totalListRowCount = resultObject.totalRows;
        this.maxPageRows = resultObject.maxPageRows;
        // this.gridData.data = this.baseServiceGroupListModelDto.slice(this.skip, this.skip + this.pageSize);
        console.log('لیست پزشکان گروه');
        console.log(this.baseBeneficiaryGroupServiceListModelDto);
      }
    });
  }

  dataStateChange(state: DataStateChangeEvent) {
    this.state.skip = state.skip;
    this.state.sort = state.sort;
    this.gridData.data = this.baseBeneficiaryGroupServiceListModelDto.slice(this.skip, this.skip + this.pageSize);
    this.baseBeneficiaryGroupsFilterDto.pageNumber = ((this.skip / this.pageSize) + 1).toString();
    // this.gridData.data = this.baseServiceGroupListModelDto;
  }

  public pageChange({skip, take}: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.gridData.data = this.baseBeneficiaryGroupServiceListModelDto;
    this.gridData.data = this.baseBeneficiaryGroupServiceListModelDto.slice(this.skip, this.skip + this.pageSize);
    // this.refereshServiceGroup();

  }

  editBaseBeneficiaryGroupService(baseBeneficiaryGroupServiceListModelDto: BaseBeneficiaryGroupServiceListModelDto) {
    this.baseBeneficiaryGroupService = baseBeneficiaryGroupServiceListModelDto;
    console.log('ویرایش پزشکان گروه');
    console.log(this.baseBeneficiaryGroupService);
    $('#NewBaseBeneficiaryGroupService').modal('show');
  }

}
