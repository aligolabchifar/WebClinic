import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {BaseBeneficiaryParaclinicChildListModelDto} from '../../../../../../../model/Base/Beneficiary/base-beneficiary-paraclinic-child-list-model-dto';
import {PatientDetailBaseComponent} from '../../../../patient-detail-base/patient-detail-base.component';
import {BeneficiaryFilterDto} from '../../../../../../../model/filter/beneficiary-filter-dto';
import {SortDescriptor, State} from '@progress/kendo-data-query';
import {DataStateChangeEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {BaseBeneficiaryParaclinicChild2ListModelDto} from '../../../../../../../model/Base/Beneficiary/base-beneficiary-paraclinic-child2-list-model-dto';
import {BaseBeneficiaryParaclinicChildService} from '../../../../../../../controller/Base/Beneficiary/base-beneficiary-paraclinic-child.service';
import {BaseParaclinicChildService} from '../../../../../../../controller/Base/ParaclinicChild/base-paraclinic-child.service';
import {ParaclinicChildFilterDto} from '../../../../../../../model/filter/paraclinic-child-filter-dto';
import {NgForm} from '@angular/forms';
import {EnumMessageType} from '../../../../../../../controller/general/notification.service';
import {PatientReceptionServiceDto} from '../../../../../../../model/Data/Reception/patient-reception-service-dto';

@Component({
  selector: 'app-new-beneficiary-paraclinic-child',
  templateUrl: './new-beneficiary-paraclinic-child.component.html',
  styleUrls: ['./new-beneficiary-paraclinic-child.component.css']
})
export class NewBeneficiaryParaclinicChildComponent extends PatientDetailBaseComponent implements OnInit, OnChanges {
  baseBeneficiaryParaclinicChild2ListModel = Array <BaseBeneficiaryParaclinicChild2ListModelDto>();
  // receptionServiceModelByIdModelDtoMains: Array<PatientReceptionServiceDto>;
  @Input() baseBeneficiaryParaclinicChild: BaseBeneficiaryParaclinicChildListModelDto;
  @Input() beneficiaryId: number;
  @ViewChild('f') registerForm: NgForm;
  baseBeneficiaryParaclinicChild2 = new BaseBeneficiaryParaclinicChild2ListModelDto();

  beneficiaryFilterDto = new BeneficiaryFilterDto();
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
  gridData: GridDataResult = {data: this.baseBeneficiaryParaclinicChild2ListModel, total: this.totalListRowCount};
  // @ts-ignore
  public state: State = {skip: 0, take: 5, sort: this.sort, filter: {logic: 'and', filters: []}};
  lstParaclinicList: any;


  constructor(private baseBeneficiaryParaclinicChildService: BaseBeneficiaryParaclinicChildService,
              private baseParaclinicChildService: BaseParaclinicChildService) {
    super();
  }

ngOnChanges(changes: SimpleChanges) {
  for (const propName in changes) {
    if (propName === 'beneficiaryId') {
      this.baseBeneficiaryParaclinicChild2.baseBeneficiaryId = this.beneficiaryId;
      this.refereshBeneficiaryParaclinicChildActivity();
      this.refereshParaclinic();
    }
    }
}

  refereshParaclinic() {
    this.paraclinicChildFilterDto.isDisabled = false;
    this.makeResponse(this.baseParaclinicChildService.getAllParaclinicChild(this.paraclinicChildFilterDto), true, resultObject => {
      if (resultObject.results) {
        this.lstParaclinicList = resultObject.results;
        console.log('تخصص های قابل دسترسی');
        console.log(resultObject.results);

      }
    });
  }


  refereshBeneficiaryParaclinicChildActivity() {
      this.beneficiaryFilterDto.beneficiaryId = this.beneficiaryId;
      this.makeResponse(this.baseBeneficiaryParaclinicChildService.getAllBeneficiaryParaclinicChild2(this.beneficiaryFilterDto), true, resultObject => {
        if (resultObject.results) {
          this.baseBeneficiaryParaclinicChild2ListModel = resultObject.results;
          this.gridData.data = this.baseBeneficiaryParaclinicChild2ListModel;
          this.gridData.total = resultObject.totalRows;
          this.totalListRowCount = resultObject.totalRows;
          this.maxPageRows = resultObject.maxPageRows;
          // this.gridData.data = this.baseServiceGroupListModelDto.slice(this.skip, this.skip + this.pageSize);
          console.log('لیست دسترسی های پاراکلینیک ');
          console.log(this.baseBeneficiaryParaclinicChild2ListModel);
        }
      });
  }


  dataStateChange(state: DataStateChangeEvent) {
    this.state.skip = state.skip;
    this.state.sort = state.sort;
    this.gridData.data = this.baseBeneficiaryParaclinicChild2ListModel.slice(this.skip, this.skip + this.pageSize);
    this.beneficiaryFilterDto.pageNumber = ((this.skip / this.pageSize) + 1).toString();
    // this.gridData.data = this.baseServiceGroupListModelDto;

  }

  public pageChange({skip, take}: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.gridData.data = this.baseBeneficiaryParaclinicChild2ListModel;
    this.gridData.data = this.baseBeneficiaryParaclinicChild2ListModel.slice(this.skip, this.skip + this.pageSize);
    // this.refereshServiceGroup();

  }

  ngOnInit(): void {
    this.baseBeneficiaryParaclinicChild2.baseBeneficiaryId = this.beneficiaryId;
    this.refereshBeneficiaryParaclinicChildActivity();
    this.refereshParaclinic();
  }

  DeleteBaseBeneficiary(baseBeneficiaryParaclinicChild2ListModelDto: BaseBeneficiaryParaclinicChild2ListModelDto) {

  }

  valueChangeParaclinicChild(e) {

    this.baseBeneficiaryParaclinicChild2.baseBeneficiaryId = this.beneficiaryId;
    this.baseBeneficiaryParaclinicChild2.baseParaclinicChildId = e;

    console.log('َشناسه ذینفع');
    console.log(this.baseBeneficiaryParaclinicChild2.baseBeneficiaryId);
    console.log('َشناسه پاراکلینیک');
    console.log(this.baseBeneficiaryParaclinicChild2.baseParaclinicChildId);
    // this.refereshBeneficiaryParaclinicChildActivity();
  }


  createBeneficiaryParaclinicChild() {

    this.makeResponse(this.baseBeneficiaryParaclinicChildService.createtBaseBeneficiaryParaclinicChild(this.baseBeneficiaryParaclinicChild2), true, resultObject => {
      console.log('موقع ثبت  پاراکلینیک');
      console.log(resultObject);
      if (resultObject !== null && resultObject.result !== null) {
        this.notificationService.toastMessage(EnumMessageType.success, 'عملیات موفق', 'ثبت با موفقیت انجام شد');
        this.baseBeneficiaryParaclinicChildService.subjectRefereshBaseBeneficiaryParaclinicChild.next(true);
        this.refereshBeneficiaryParaclinicChildActivity();



      }
    });

  }


  onSubmit() {

    console.log('مقدار baseBeneficiaryParaclinicChild2');
    console.log(this.baseBeneficiaryParaclinicChild2);
    this.createBeneficiaryParaclinicChild();

  }
}
