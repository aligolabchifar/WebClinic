import { Component, OnInit } from '@angular/core';
import {PatientDetailBaseComponent} from '../../../patient-detail-base/patient-detail-base.component';
import {BaseServiceGroupListTotalModelDto} from '../../../../../../model/Base/BaseService/base-service-group-list-total-model-dto';
import {BaseServiceGroupRelationListModelDto} from '../../../../../../model/Base/BaseService/base-service-group-relation-list-model-dto';
import {BaseServiceGroupFilterDto} from '../../../../../../model/filter/base-service-group-filter-dto';
import {BaseServiceGroupRelationFilterDto} from '../../../../../../model/filter/base-service-group-relation-filter-dto';
import {SortDescriptor, State} from '@progress/kendo-data-query';
import {DataStateChangeEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {BaseServiceGroupRelationService} from '../../../../../../controller/Base/BaseServices/base-service-group-relation.service';
import {BaseServiceGroupModelDto} from '../../../../../../model/Base/BaseService/base-service-group-model-dto';
import {BaseServiceFirstListModelDto} from '../../../../../../model/Base/BaseService/base-service-first-list-model-dto';
import {BaseServiceParaclinicChildListModelDto} from '../../../../../../model/Base/ServiceParaclinic/base-service-paraclinic-child-list-model-dto';
declare var $: any;
@Component({
  selector: 'app-base-service-group-relation-list',
  templateUrl: './base-service-group-relation-list.component.html',
  styleUrls: ['./base-service-group-relation-list.component.css']
})
export class BaseServiceGroupRelationListComponent extends PatientDetailBaseComponent implements OnInit {
  baseServiceGroupRelationListModelDto: Array<BaseServiceGroupRelationListModelDto>;
  baseServiceGroupRelation = new BaseServiceGroupRelationListModelDto();
  baseServiceGroupRelationFilterDto = new BaseServiceGroupRelationFilterDto();
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
  gridData: GridDataResult = {data: this.baseServiceGroupRelationListModelDto, total: this.totalListRowCount};
  // @ts-ignore
  public state: State = {skip: 0, take: 5, sort: this.sort, filter: {logic: 'and', filters: []}};
  constructor(private baseServiceGroupRelationService: BaseServiceGroupRelationService) {
    super();
  }

  ngOnInit(): void {
    // this.state = {skip: 0, take: 5, sort: this.sort};
    // console.log('فیلتر سرویس و گروه سرویس')
    // console.log(this.baseServiceGroupRelationFilterDto);
    // this.refereshServiceGroupRelation();


    this.state = {skip: 0, take: 5, sort: this.sort};
    this.refereshServiceGroupRelation();
    this.baseServiceGroupRelationService.subjectRefereshBaseServiceGroupRelation.subscribe(isRefresh => {
      if (isRefresh === true) {
        this.refereshServiceGroupRelation();

      }
    });

    this.baseServiceGroupRelationService.subjectNewBaseServiceGroupRelation.subscribe(isRefresh => {
      if (isRefresh === true) {
        console.log('ایجاد گروه سرویس جدید');

        this.baseServiceGroupRelation = new BaseServiceGroupRelationListModelDto();

        $('#NewBaseServiceGroupRelation').modal('show');

      }
    });

  }

  refereshServiceGroupRelation() {
    this.makeResponse(this.baseServiceGroupRelationService.getAllBaseServiceGroupRelation(this.baseServiceGroupRelationFilterDto), true, resultObject => {

      if (resultObject.results) {
        this.baseServiceGroupRelationListModelDto = resultObject.results;
        this.gridData.data = this.baseServiceGroupRelationListModelDto;
        this.gridData.total = resultObject.totalRows;
        this.totalListRowCount = resultObject.totalRows;
        this.maxPageRows = resultObject.maxPageRows;
        // this.gridData.data = this.baseServiceGroupListModelDto.slice(this.skip, this.skip + this.pageSize);
        console.log('ارتباط سرویس و گروه سرویس');
        console.log(this.baseServiceGroupRelationListModelDto);
      }
    });
  }


  editGroupService(baseServiceGroupRelations: BaseServiceGroupRelationListModelDto) {
    this.baseServiceGroupRelation = baseServiceGroupRelations;
    console.log('مقدار گروه سرویس ویرایش شده');
    console.log(this.baseServiceGroupRelation);
    $('#NewBaseServiceGroupRelation').modal('show');
  }

  dataStateChange(state: DataStateChangeEvent) {
    this.state.skip = state.skip;
    this.state.sort = state.sort;
    this.gridData.data = this.baseServiceGroupRelationListModelDto.slice(this.skip, this.skip + this.pageSize);
    this.baseServiceGroupRelationFilterDto.pageNumber = ((this.skip / this.pageSize) + 1).toString();
    // this.gridData.data = this.baseServiceGroupListModelDto;
  }

  public pageChange({skip, take}: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.gridData.data = this.baseServiceGroupRelationListModelDto;
    this.gridData.data = this.baseServiceGroupRelationListModelDto.slice(this.skip, this.skip + this.pageSize);
    // this.refereshServiceGroup();

  }





}
