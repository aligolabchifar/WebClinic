import { Component, OnInit } from '@angular/core';
import {PatientDetailBaseComponent} from '../../../../patient-detail-base/patient-detail-base.component';
import {BaseBeneficiaryParaclinicChildService} from '../../../../../../../controller/Base/Beneficiary/base-beneficiary-paraclinic-child.service';
import {BaseBeneficiaryParaclinicChildListModelDto} from '../../../../../../../model/Base/Beneficiary/base-beneficiary-paraclinic-child-list-model-dto';
import {BaseBeneficiaryListModelDto} from '../../../../../../../model/Base/Beneficiary/base-beneficiary-list-model-dto';
import {SortDescriptor, State} from '@progress/kendo-data-query';
import {DataStateChangeEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {BeneficiaryFilterDto} from '../../../../../../../model/filter/beneficiary-filter-dto';
import {BaseBeneficiaryParaclinicChild2ListModelDto} from '../../../../../../../model/Base/Beneficiary/base-beneficiary-paraclinic-child2-list-model-dto';
declare var $: any;

@Component({
  selector: 'app-beneficiary-paraclinic-child-list',
  templateUrl: './beneficiary-paraclinic-child-list.component.html',
  styleUrls: ['./beneficiary-paraclinic-child-list.component.css']
})
export class BeneficiaryParaclinicChildListComponent extends PatientDetailBaseComponent implements OnInit {

  baseBeneficiaryParaclinicChildListModelDto: Array<BaseBeneficiaryParaclinicChildListModelDto>;
  baseBeneficiaryParaclinicChild = new BaseBeneficiaryParaclinicChildListModelDto();
  baseBeneficiaryParaclinicChild2ListModel: Array<BaseBeneficiaryParaclinicChild2ListModelDto>;
  beneficiaryId: number;
  beneficiaryFilterDto = new BeneficiaryFilterDto();
  public buttonCount = 5;
  public info = true;
  public type: 'numeric' | 'input' = 'numeric';
  public pageSizes = true;
  public previousNext = true;
  public pageSize = 5;
  public skip = 0;
  public sort: SortDescriptor[];
  id: number;
  // public state: State;
  maxPageRows = 0;
  // @ts-ignore
  gridData: GridDataResult = {data: this.baseBeneficiaryParaclinicChildListModelDto, total: this.totalListRowCount};
  // @ts-ignore
  public state: State = {skip: 0, take: 5, sort: this.sort, filter: {logic: 'and', filters: []}};


  constructor(private baseBeneficiaryParaclinicChildService: BaseBeneficiaryParaclinicChildService) {
    super();
  }


  refereshBeneficiaryParaclinicChild() {
    this.makeResponse(this.baseBeneficiaryParaclinicChildService.getAllBeneficiaryParaclinicChild(this.beneficiaryFilterDto), true, resultObject => {

      if (resultObject.results) {
        this.baseBeneficiaryParaclinicChildListModelDto = resultObject.results;
        this.gridData.data = this.baseBeneficiaryParaclinicChildListModelDto;
        this.gridData.total = resultObject.totalRows;
        this.totalListRowCount = resultObject.totalRows;
        this.maxPageRows = resultObject.maxPageRows;
        // this.gridData.data = this.baseServiceGroupListModelDto.slice(this.skip, this.skip + this.pageSize);
        console.log('لیست پزشکان پاراکلینیک ');
        console.log(this.baseBeneficiaryParaclinicChildListModelDto);
      }
    });
  }


  ngOnInit(): void {
    this.beneficiaryId = 0;
    this.state = {skip: 0, take: 5, sort: this.sort};

    this.refereshBeneficiaryParaclinicChild();


    this.baseBeneficiaryParaclinicChildService.subjectRefereshBaseBeneficiaryParaclinicChild.subscribe(isRefresh => {
      if (isRefresh === true) {
        console.log('اکبر');
        this.refereshBeneficiaryParaclinicChild();

      }
    });


    this.baseBeneficiaryParaclinicChildService.subjectNewBaseBeneficiaryParaclinicChild.subscribe(isRefresh => {
      if (isRefresh === true) {
        console.log('ایجاد  پزشک پاراکلینیک جدید');
        this.baseBeneficiaryParaclinicChild = new BaseBeneficiaryParaclinicChildListModelDto();
        $('#NewBaseBeneficiaryParaclinic').modal('show');
      }
    });
  }


  dataStateChange(state: DataStateChangeEvent) {
    this.state.skip = state.skip;
    this.state.sort = state.sort;
    this.gridData.data = this.baseBeneficiaryParaclinicChildListModelDto.slice(this.skip, this.skip + this.pageSize);
    this.beneficiaryFilterDto.pageNumber = ((this.skip / this.pageSize) + 1).toString();
    // this.gridData.data = this.baseServiceGroupListModelDto;
  }

  public pageChange({skip, take}: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.gridData.data = this.baseBeneficiaryParaclinicChildListModelDto;
    this.gridData.data = this.baseBeneficiaryParaclinicChildListModelDto.slice(this.skip, this.skip + this.pageSize);
    // this.refereshServiceGroup();

  }





    editBaseBeneficiary(baseBeneficiaryParaclinicChildListModelDto: BaseBeneficiaryParaclinicChildListModelDto) {

    this.baseBeneficiaryParaclinicChild = baseBeneficiaryParaclinicChildListModelDto;
    this.id = baseBeneficiaryParaclinicChildListModelDto.id;
    this.beneficiaryId = baseBeneficiaryParaclinicChildListModelDto.id;



    console.log(this.baseBeneficiaryParaclinicChild);
    console.log('ویرایش مشخصات پزشک');
    console.log(this.baseBeneficiaryParaclinicChild);

    this.beneficiaryFilterDto.beneficiaryId = this.baseBeneficiaryParaclinicChild.id;


    // setTimeout(() => {


    console.log('سلام. ');
    $('#NewBaseBeneficiaryParaclinic').modal('show');

      // }, 1000);

    // $('#NewBaseBeneficiaryParaclinic' + this.id).modal('show');
  }
}
