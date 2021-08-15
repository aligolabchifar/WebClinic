import { Component, OnInit } from '@angular/core';
import {PatientDetailBaseComponent} from '../../../patient-detail-base/patient-detail-base.component';
import {BaseServiceGroupService} from '../../../../../../controller/Base/BaseServices/base-service-group.service';
import {BaseBeneficiarySpecialService} from '../../../../../../controller/Base/Specials/base-beneficiary-special.service';
import {BaseBeneficiarySpecialFilterDto} from '../../../../../../model/filter/base-beneficiary-special-filter-dto';
import {BaseServiceGroupListTotalModelDto} from '../../../../../../model/Base/BaseService/base-service-group-list-total-model-dto';
import {BaseBeneficiarySpecialModelDto} from '../../../../../../model/Base/Specials/base-beneficiary-special-model-dto';
import {SortDescriptor, State} from '@progress/kendo-data-query';
import {DataStateChangeEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {BaseBeneficiaryGroupsListModelDto} from '../../../../../../model/Base/BeneficiaryGroups/base-beneficiary-groups-list-model-dto';
import {BaseBeneficiaryGroupsFilterDto} from '../../../../../../model/filter/base-beneficiary-groups-filter-dto';
import {BaseUserModelDto} from '../../../../../../model/Base/User/base-user-model-dto';
import {BaseBeneficiaryGroupsService} from '../../../../../../controller/Base/BeneficiaryGroup/base-beneficiary-groups.service';
declare var $: any;

@Component({
  selector: 'app-base-beneficiary-groups',
  templateUrl: './base-beneficiary-groups.component.html',
  styleUrls: ['./base-beneficiary-groups.component.css']
})
export class BaseBeneficiaryGroupsComponent extends PatientDetailBaseComponent implements OnInit {

  baseBeneficiaryGroupsListModelDto: Array<BaseBeneficiaryGroupsListModelDto>;
  baseBeneficiaryGroups = new BaseBeneficiaryGroupsListModelDto();
  baseBeneficiaryGroupsFilterDto = new BaseBeneficiaryGroupsFilterDto();

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
  gridData: GridDataResult = {data: this.baseBeneficiaryGroupsListModelDto, total: this.totalListRowCount};
  // @ts-ignore
  public state: State = {skip: 0, take: 5, sort: this.sort, filter: {logic: 'and', filters: []}};


  userInfo: BaseUserModelDto;

  constructor(private baseBeneficiaryGroupsService: BaseBeneficiaryGroupsService) {
    super();
  }


  refereshBeneficiaryGroup() {
    this.makeResponse(this.baseBeneficiaryGroupsService.getAllBaseBeneficiaryGroups(this.baseBeneficiaryGroupsFilterDto), true, resultObject => {

      if (resultObject.results) {
        this.baseBeneficiaryGroupsListModelDto = resultObject.results;
        this.gridData.data = this.baseBeneficiaryGroupsListModelDto;
        this.gridData.total = resultObject.totalRows;
        this.totalListRowCount = resultObject.totalRows;
        this.maxPageRows = resultObject.maxPageRows;
        // this.gridData.data = this.baseServiceGroupListModelDto.slice(this.skip, this.skip + this.pageSize);
        console.log('ریز تخصص پزشک ');
        console.log(this.baseBeneficiaryGroupsListModelDto);
      }
    });
  }



  ngOnInit(): void {

    this.state = {skip: 0, take: 5, sort: this.sort};

    this.refereshBeneficiaryGroup();


    this.baseBeneficiaryGroupsService.subjectRefereshBaseBeneficiaryGroup.subscribe(isRefresh => {
      if (isRefresh === true) {
        this.refereshBeneficiaryGroup();

      }
    });


    this.baseBeneficiaryGroupsService.subjectNewBaseBeneficiaryGroup.subscribe(isRefresh => {
      if (isRefresh === true) {
        console.log('ایجاد ریز تخصص پزشک جدید');

        this.baseBeneficiaryGroups = new BaseBeneficiaryGroupsListModelDto();

        $('#NewBeneficiaryGroupsList').modal('show');

      }
    });
  }

  dataStateChange(state: DataStateChangeEvent) {
    this.state.skip = state.skip;
    this.state.sort = state.sort;
    this.gridData.data = this.baseBeneficiaryGroupsListModelDto.slice(this.skip, this.skip + this.pageSize);
    this.baseBeneficiaryGroupsFilterDto.pageNumber = ((this.skip / this.pageSize) + 1).toString();
    // this.gridData.data = this.baseServiceGroupListModelDto;
  }

  public pageChange({skip, take}: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.gridData.data = this.baseBeneficiaryGroupsListModelDto;
    this.gridData.data = this.baseBeneficiaryGroupsListModelDto.slice(this.skip, this.skip + this.pageSize);
    // this.refereshServiceGroup();

  }

  editGroupService(baseBeneficiaryGroupsListModelDto: BaseBeneficiaryGroupsListModelDto) {
    this.baseBeneficiaryGroups = baseBeneficiaryGroupsListModelDto;

    console.log(this.baseBeneficiaryGroups);
    console.log('ویرایش ریز  تخصص پزشک');
    console.log(this.baseBeneficiaryGroups);
    $('#NewBeneficiaryGroupsList').modal('show');
  }

}
