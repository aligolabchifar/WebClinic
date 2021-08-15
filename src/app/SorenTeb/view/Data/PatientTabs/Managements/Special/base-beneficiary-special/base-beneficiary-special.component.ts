import {Component, OnInit} from '@angular/core';
import {PatientDetailBaseComponent} from '../../../patient-detail-base/patient-detail-base.component';
import {BaseServiceGroupListFullModelDto} from '../../../../../../model/Base/BaseService/base-service-group-list-full-model-dto';
import {BaseServiceGroupFilterDto} from '../../../../../../model/filter/base-service-group-filter-dto';
import {BaseBeneficiarySpecialModelDto} from '../../../../../../model/Base/Specials/base-beneficiary-special-model-dto';
import {BaseBeneficiarySpecialFilterDto} from '../../../../../../model/filter/base-beneficiary-special-filter-dto';
import {SortDescriptor, State} from '@progress/kendo-data-query';
import {DataStateChangeEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {BaseServiceGroupModelDto} from '../../../../../../model/Base/BaseService/base-service-group-model-dto';
import {BaseUserModelDto} from '../../../../../../model/Base/User/base-user-model-dto';
import {BaseServiceGroupParaclinicChildService} from '../../../../../../controller/Base/BaseServices/base-service-group-paraclinic-child.service';
import {BaseBeneficiarySpecialService} from '../../../../../../controller/Base/Specials/base-beneficiary-special.service';

declare var $: any;

@Component({
  selector: 'app-base-beneficiary-special',
  templateUrl: './base-beneficiary-special.component.html',
  styleUrls: ['./base-beneficiary-special.component.css']
})
export class BaseBeneficiarySpecialComponent extends PatientDetailBaseComponent implements OnInit {

  baseBeneficiarySpecialModelDto: Array<BaseBeneficiarySpecialModelDto>;
  baseBeneficiarySpecial = new BaseBeneficiarySpecialModelDto();
  baseBeneficiarySpecialFilterDto = new BaseBeneficiarySpecialFilterDto();
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
  gridData: GridDataResult = {data: this.baseBeneficiarySpecialModelDto, total: this.totalListRowCount};
  // @ts-ignore
  public state: State = {skip: 0, take: 5, sort: this.sort, filter: {logic: 'and', filters: []}};


  userInfo: BaseUserModelDto;

  constructor(private baseBeneficiarySpecialService: BaseBeneficiarySpecialService) {
    super();
  }


  refereshBeneficiarySpecial() {
    this.makeResponse(this.baseBeneficiarySpecialService.getAllBaseBeneficiarySpecial(this.baseBeneficiarySpecialFilterDto), true, resultObject => {

      if (resultObject.results) {
        this.baseBeneficiarySpecialModelDto = resultObject.results;
        this.gridData.data = this.baseBeneficiarySpecialModelDto;
        this.gridData.total = resultObject.totalRows;
        this.totalListRowCount = resultObject.totalRows;
        this.maxPageRows = resultObject.maxPageRows;
        // this.gridData.data = this.baseServiceGroupListModelDto.slice(this.skip, this.skip + this.pageSize);
        console.log('تخصص پزشک ');
        console.log(this.baseBeneficiarySpecialModelDto);
      }
    });
  }


  ngOnInit(): void {
    this.state = {skip: 0, take: 5, sort: this.sort};

    this.refereshBeneficiarySpecial();


    this.baseBeneficiarySpecialService.subjectRefereshBaseBeneficiarySpecial.subscribe(isRefresh => {
      if (isRefresh === true) {
        this.refereshBeneficiarySpecial();

      }
    });


    this.baseBeneficiarySpecialService.subjectNewBaseBeneficiarySpecial.subscribe(isRefresh => {
      if (isRefresh === true) {
        console.log('ایجاد تخصص پزشک جدید');

        this.baseBeneficiarySpecial = new BaseBeneficiarySpecialModelDto();

        $('#NewSpecialList').modal('show');

      }
    });

  }

  dataStateChange(state: DataStateChangeEvent) {
    this.state.skip = state.skip;
    this.state.sort = state.sort;
    this.gridData.data = this.baseBeneficiarySpecialModelDto.slice(this.skip, this.skip + this.pageSize);
    this.baseBeneficiarySpecialFilterDto.pageNumber = ((this.skip / this.pageSize) + 1).toString();
    // this.gridData.data = this.baseServiceGroupListModelDto;
  }

  public pageChange({skip, take}: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.gridData.data = this.baseBeneficiarySpecialModelDto;
    this.gridData.data = this.baseBeneficiarySpecialModelDto.slice(this.skip, this.skip + this.pageSize);
    // this.refereshServiceGroup();

  }

  editGroupService(baseBeneficiarySpecialModelDto: BaseBeneficiarySpecialModelDto) {
    this.baseBeneficiarySpecial = baseBeneficiarySpecialModelDto;

    console.log(this.baseBeneficiarySpecial);
    console.log('ویرایش تخصص پزشک');
    console.log(this.baseBeneficiarySpecial);
    $('#NewSpecialList').modal('show');
  }
}
