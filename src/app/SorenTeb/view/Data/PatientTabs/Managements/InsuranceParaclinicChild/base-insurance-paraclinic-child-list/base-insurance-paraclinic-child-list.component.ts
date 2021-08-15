import {Component, OnInit, ViewChild} from '@angular/core';
import {PatientDetailBaseComponent} from '../../../patient-detail-base/patient-detail-base.component';
import {NgForm} from '@angular/forms';
import {BaseInsuranceParaclinicChildModelDto} from '../../../../../../model/Base/InsuranceParaclinicChild/base-insurance-paraclinic-child-model-dto';
import {BaseInsuranceParaclinicChildFilterDto} from '../../../../../../model/filter/base-insurance-paraclinic-child-filter-dto';
import {BaseInsuranceParaclinicChildService} from '../../../../../../controller/Base/InsuranceParaclinicChild/base-insurance-paraclinic-child.service';
import {SortDescriptor, State} from '@progress/kendo-data-query';
import {DataStateChangeEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {BaseInsuranceDto} from '../../../../../../model/Base/Insurance/base-insurance-dto';
import {BaseBeneficiaryGroupsListModelDto} from '../../../../../../model/Base/BeneficiaryGroups/base-beneficiary-groups-list-model-dto';
declare var $: any;

@Component({
  selector: 'app-base-insurance-paraclinic-child-list',
  templateUrl: './base-insurance-paraclinic-child-list.component.html',
  styleUrls: ['./base-insurance-paraclinic-child-list.component.css']
})
export class BaseInsuranceParaclinicChildListComponent extends PatientDetailBaseComponent implements OnInit {

  @ViewChild('f') registerForm: NgForm;
  baseInsuranceParaclinicChildModelDto: Array<BaseInsuranceParaclinicChildModelDto>;
  baseInsuranceParaclinicChild = new BaseInsuranceParaclinicChildModelDto();
  baseInsuranceParaclinicChildFilterDto = new BaseInsuranceParaclinicChildFilterDto();


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
  gridData: GridDataResult = {data: this.baseInsuranceParaclinicChildModelDto, total: this.totalListRowCount};
  // @ts-ignore
  public state: State = {skip: 0, take: 5, sort: this.sort, filter: {logic: 'and', filters: []}};



  constructor(private baseInsuranceParaclinicChildService: BaseInsuranceParaclinicChildService) {
    super();
  }

  ngOnInit(): void {

    this.state = {skip: 0, take: 5, sort: this.sort};


    this.refereshInsuranceParaclinicChild();


    this.baseInsuranceParaclinicChildService.subjectRefereshInsuranceParaclinicChild.subscribe(isRefresh => {
      if (isRefresh === true) {
        this.refereshInsuranceParaclinicChild();

      }
    });



    this.baseInsuranceParaclinicChildService.subjectNewInsuranceParaclinicChild.subscribe(isRefresh => {
      if (isRefresh === true) {
        console.log('ایجاد  بیمه جدید');
        this.baseInsuranceParaclinicChild = new BaseInsuranceParaclinicChildModelDto();
        $('#NewBaseInsuranceParaclinicChild').modal('show');
      }
    });



  }

  refereshInsuranceParaclinicChild() {
    this.makeResponse(this.baseInsuranceParaclinicChildService.getAllBaseInsuranceCertificate(this.baseInsuranceParaclinicChildFilterDto), true, resultObject => {
      if (resultObject.results) {
        this.baseInsuranceParaclinicChildModelDto = resultObject.results;
        this.gridData.data = this.baseInsuranceParaclinicChildModelDto;
        this.gridData.total = resultObject.totalRows;
        this.totalListRowCount = resultObject.totalRows;
        this.maxPageRows = resultObject.maxPageRows;
        console.log('لیست بیمه ها');
        console.log(this.baseInsuranceParaclinicChildModelDto);
      }
    });
  }

  dataStateChange(state: DataStateChangeEvent) {
    this.state.skip = state.skip;
    this.state.sort = state.sort;
    this.gridData.data = this.baseInsuranceParaclinicChildModelDto.slice(this.skip, this.skip + this.pageSize);
    this.baseInsuranceParaclinicChildFilterDto.pageNumber = ((this.skip / this.pageSize) + 1).toString();
    // this.gridData.data = this.baseServiceGroupListModelDto;
  }

  public pageChange({skip, take}: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.gridData.data = this.baseInsuranceParaclinicChildModelDto;
    this.gridData.data = this.baseInsuranceParaclinicChildModelDto.slice(this.skip, this.skip + this.pageSize);
    // this.refereshServiceGroup();

  }

  editBaseInsurance(BaseInsuranceParaclinicChild: BaseInsuranceParaclinicChildModelDto) {
    this.baseInsuranceParaclinicChild = BaseInsuranceParaclinicChild;
    console.log('ویرایش بیمه');
    console.log(this.baseInsuranceParaclinicChild);
    $('#NewBaseInsuranceParaclinicChild').modal('show');
  }

}
