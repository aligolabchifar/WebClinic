import { Component, OnInit } from '@angular/core';
import {PatientDetailBaseComponent} from '../../../patient-detail-base/patient-detail-base.component';
import {BaseBeneficiaryService} from '../../../../../../controller/Base/Beneficiary/base-beneficiary.service';
import {BaseBeneficiarySpecialModelDto} from '../../../../../../model/Base/Specials/base-beneficiary-special-model-dto';
import {BaseBeneficiarySpecialFilterDto} from '../../../../../../model/filter/base-beneficiary-special-filter-dto';
import {SortDescriptor, State} from '@progress/kendo-data-query';
import {DataStateChangeEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {BaseUserModelDto} from '../../../../../../model/Base/User/base-user-model-dto';
import {BaseBeneficiaryListModelDto} from '../../../../../../model/Base/Beneficiary/base-beneficiary-list-model-dto';
import {BeneficiaryFilterDto} from '../../../../../../model/filter/beneficiary-filter-dto';
import {RoutinParaclinicFilterDto} from '../../../../../../model/filter/routin-paraclinic-filter-dto';
declare var $: any;

@Component({
  selector: 'app-base-beneficiary-list',
  templateUrl: './base-beneficiary-list.component.html',
  styleUrls: ['./base-beneficiary-list.component.css']
})
export class BaseBeneficiaryListComponent extends PatientDetailBaseComponent implements OnInit {

  baseBeneficiaryListModelDto: Array<BaseBeneficiaryListModelDto>;
  baseBeneficiary = new BaseBeneficiaryListModelDto();
  beneficiaryFilterDto = new BeneficiaryFilterDto();

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
  gridData: GridDataResult = {data: this.baseBeneficiaryListModelDto, total: this.totalListRowCount};
  // @ts-ignore
  public state: State = {skip: 0, take: 5, sort: this.sort, filter: {logic: 'and', filters: []}};


  userInfo: BaseUserModelDto;


  constructor(private baseBeneficiaryService: BaseBeneficiaryService) {
    super();
  }

  refereshBaseBeneficiary() {
    this.makeResponse(this.baseBeneficiaryService.getAllBeneficiaryFirst(this.beneficiaryFilterDto), true, resultObject => {

      if (resultObject.results) {
        this.baseBeneficiaryListModelDto = resultObject.results;
        this.gridData.data = this.baseBeneficiaryListModelDto;
        this.gridData.total = resultObject.totalRows;
        this.totalListRowCount = resultObject.totalRows;
        this.maxPageRows = resultObject.maxPageRows;
        // this.gridData.data = this.baseServiceGroupListModelDto.slice(this.skip, this.skip + this.pageSize);
        console.log('لیست پزشکان ');
        console.log(this.baseBeneficiaryListModelDto);
      }
    });
  }

  ngOnInit(): void {
    this.state = {skip: 0, take: 5, sort: this.sort};

    this.refereshBaseBeneficiary();


    this.baseBeneficiaryService.subjectRefereshBaseBeneficiary.subscribe(isRefresh => {
      if (isRefresh === true) {
        this.refereshBaseBeneficiary();

      }
    });


    this.baseBeneficiaryService.subjectNewBaseBeneficiary.subscribe(isRefresh => {
      if (isRefresh === true) {
        console.log('ایجاد  پزشک جدید');

        this.baseBeneficiary = new BaseBeneficiaryListModelDto();

        $('#NewBaseBeneficiary').modal('show');

      }
    });

  }

  dataStateChange(state: DataStateChangeEvent) {
    this.state.skip = state.skip;
    this.state.sort = state.sort;
    this.gridData.data = this.baseBeneficiaryListModelDto.slice(this.skip, this.skip + this.pageSize);
    this.beneficiaryFilterDto.pageNumber = ((this.skip / this.pageSize) + 1).toString();
    // this.gridData.data = this.baseServiceGroupListModelDto;
  }

  public pageChange({skip, take}: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.gridData.data = this.baseBeneficiaryListModelDto;
    this.gridData.data = this.baseBeneficiaryListModelDto.slice(this.skip, this.skip + this.pageSize);
    // this.refereshServiceGroup();

  }

  editBaseBeneficiary(baseBeneficiaryListModelDto: BaseBeneficiaryListModelDto) {
    this.baseBeneficiary = baseBeneficiaryListModelDto;

    console.log(this.baseBeneficiary);
    console.log('ویرایش مشخصات پزشک');
    console.log(this.baseBeneficiary);
    $('#NewBaseBeneficiary').modal('show');
  }

}
