import { Component, OnInit } from '@angular/core';
import {PatientDetailBaseComponent} from '../../../patient-detail-base/patient-detail-base.component';
import {BaseParaclinicChildService} from '../../../../../../controller/Base/ParaclinicChild/base-paraclinic-child.service';
import {BaseBeneficiaryListModelDto} from '../../../../../../model/Base/Beneficiary/base-beneficiary-list-model-dto';
import {BeneficiaryFilterDto} from '../../../../../../model/filter/beneficiary-filter-dto';
import {SortDescriptor, State} from '@progress/kendo-data-query';
import {DataStateChangeEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {BaseUserModelDto} from '../../../../../../model/Base/User/base-user-model-dto';
import {BaseParaclinicChildListModelDto} from '../../../../../../model/Base/Paraclinic/base-paraclinic-child-list-model-dto';
import {ParaclinicChildFilterDto} from '../../../../../../model/filter/paraclinic-child-filter-dto';
declare var $: any;

@Component({
  selector: 'app-paraclinic-child-list',
  templateUrl: './paraclinic-child-list.component.html',
  styleUrls: ['./paraclinic-child-list.component.css']
})
export class ParaclinicChildListComponent extends PatientDetailBaseComponent implements OnInit {

  baseParaclinicChildListModelDto: Array<BaseParaclinicChildListModelDto>;
  baseParaclinicChild = new BaseParaclinicChildListModelDto();
  paraclinicChildFilterDto = new ParaclinicChildFilterDto();
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
  gridData: GridDataResult = {data: this.baseParaclinicChildListModelDto, total: this.totalListRowCount};
  // @ts-ignore
  public state: State = {skip: 0, take: 5, sort: this.sort, filter: {logic: 'and', filters: []}};


  userInfo: BaseUserModelDto;


  constructor(private  baseParaclinicChildService: BaseParaclinicChildService) {
    super();
  }

  ngOnInit(): void {
    this.state = {skip: 0, take: 5, sort: this.sort};

    this.refereshBaseParaclinicChild();


    this.baseParaclinicChildService.subjectRefereshBaseParaclinicChild.subscribe(isRefresh => {
      if (isRefresh === true) {
        this.refereshBaseParaclinicChild();

      }
    });


    this.baseParaclinicChildService.subjectNewBaseParaclinicChild.subscribe(isRefresh => {
      if (isRefresh === true) {
        console.log('ایجاد  پاراکلینیک');

        this.baseParaclinicChild = new BaseParaclinicChildListModelDto();

        $('#NewBaseParaclinicChild').modal('show');

      }
    });

  }


  refereshBaseParaclinicChild() {
    this.makeResponse(this.baseParaclinicChildService.getAllBaseParaclinicChildList(this.paraclinicChildFilterDto), true, resultObject => {

      if (resultObject.results) {
        this.baseParaclinicChildListModelDto = resultObject.results;
        this.gridData.data = this.baseParaclinicChildListModelDto;
        this.gridData.total = resultObject.totalRows;
        this.totalListRowCount = resultObject.totalRows;
        this.maxPageRows = resultObject.maxPageRows;
        // this.gridData.data = this.baseServiceGroupListModelDto.slice(this.skip, this.skip + this.pageSize);
        console.log('لیست پاراکلینیک ');
        console.log(this.baseParaclinicChildListModelDto);
      }
    });
  }

  dataStateChange(state: DataStateChangeEvent) {
    this.state.skip = state.skip;
    this.state.sort = state.sort;
    this.gridData.data = this.baseParaclinicChildListModelDto.slice(this.skip, this.skip + this.pageSize);
    this.paraclinicChildFilterDto.pageNumber = ((this.skip / this.pageSize) + 1).toString();
    // this.gridData.data = this.baseServiceGroupListModelDto;
  }

  public pageChange({skip, take}: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.gridData.data = this.baseParaclinicChildListModelDto;
    this.gridData.data = this.baseParaclinicChildListModelDto.slice(this.skip, this.skip + this.pageSize);
    // this.refereshServiceGroup();

  }

  editParaclinicChild(baseParaclinicChildListModelDto: BaseParaclinicChildListModelDto) {
    this.baseParaclinicChild = baseParaclinicChildListModelDto;
    console.log('ویرایش پاراکلینیک');
    console.log(this.baseParaclinicChild);
    $('#NewBaseParaclinicChild').modal('show');
  }

}
