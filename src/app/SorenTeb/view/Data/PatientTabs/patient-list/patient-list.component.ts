import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {PatientDetailBaseComponent} from '../patient-detail-base/patient-detail-base.component';
import {ReceptionListReceptionServiceModelDto} from '../../../../model/Data/Reception/reception-list-reception-service-model-dto';
import {ReceptionListReceptionListModelDto} from '../../../../model/Data/Reception/reception-list-reception-list-model-dto';
import {SortDescriptor, State} from '@progress/kendo-data-query';
import {DataStateChangeEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {PatientReceptionServiceDto} from '../../../../model/Data/Reception/patient-reception-service-dto';
import {Sort} from '../../../../model/main/sort';
import {PatientReceptionServiceService} from '../../../../controller/DataTables/Receptions/patient-reception-service.service';
import {ReceptionService} from '../../../../controller/DataTables/Receptions/reception.service';
import {ReceptionFilterDto} from '../../../../model/filter/reception-filter-dto';
declare var $: any;
@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent extends PatientDetailBaseComponent implements OnInit {
  @Output() receptionEmmit = new EventEmitter();
   @Input() receptionList: Array<ReceptionListReceptionListModelDto>;

  receptionLists:  Array<ReceptionListReceptionListModelDto>;
  @Input() receptionById: ReceptionListReceptionServiceModelDto;
  @Input() lastNameSearch: string;
  receptionFilterDto = new ReceptionFilterDto();
   isShowReception: boolean;
  // @Input() receptionList: Array<ReceptionListReceptionListModelDto>;
  ReceptionListReceptionListModelDtos: Array<ReceptionListReceptionListModelDto>;
  public buttonCount = 5;
  // public info = true;
  // public type: 'numeric' | 'input' = 'numeric';
  // public pageSizes = true;
  // public previousNext = true;
  public pageSize = 100;
  public skip = 0;
  // public sort: SortDescriptor[];
  // public state: State;

  public sort: Sort[];
  // @ts-ignore
  public state: State = {skip: 0, take: 5 , sort: this.sort, filter: {logic: 'and', filters: []}};
  // @ts-ignore
  public gridData: GridDataResult = {data: this.receptionList , total: this.totalListRowCount};
  public info = true;
  public type: 'numeric' | 'input' = 'numeric';
  public pageSizes = true;
  public previousNext = true;

  // @ts-ignore
  // gridData: GridDataResult = {data: this.receptionList, total: this.totalListRowCount};

  constructor(private  receptionService: ReceptionService) {
    super();



  }

  dataStateChange(state: DataStateChangeEvent) {
    this.state.take = state.take;
    this.state.skip = state.skip;
    this.state.sort = state.sort;
    this.gridData.data = this.receptionList;
    this.gridData.data = this.receptionList.slice(this.skip, this.skip + this.pageSize);
  }

  public pageChange({skip, take}: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.gridData.data = this.receptionList.slice(this.skip, this.skip + this.pageSize);
  }

  ngOnInit(): void {


    this.receptionService.subjectReception.subscribe(isRefresh => {
      if (isRefresh === true) {
       this.receptionFilterDto.lastName = this.lastNameSearch;
       this.makeResponse(this.receptionService.getAllReceptionList(this.receptionFilterDto), true, resultObject => {
          if (resultObject.results) {
            this.receptionLists = resultObject.results;
            this.gridData.data = this.receptionLists;
            // this.receptionService.subjectReception.next(true);
            console.log('لیست پذیرش ها ');
            console.log(this.receptionLists);


          }
        });

       if (this.receptionLists !== undefined)
        {

          this.gridData.data = this.receptionLists;
          this.gridData = {data: this.receptionLists, total: this.totalListRowCount};
        }
      }
    });



    // console.log('جستجوی نام خانوادگی  2 ');
    // console.log(this.receptionList);
    //
    // if (this.receptionList !== undefined)
    // {
    //   alert(this.receptionList.length);
    //   this.gridData.data = this.receptionList;
    //   this.gridData = {data: this.receptionList, total: this.totalListRowCount};
    // }

  }


  setFindPatient(receptionList: ReceptionListReceptionListModelDto) {

    console.log('مشتری انتخاب شده');
    console.log(receptionList);
    receptionList.receptionCode = '';
    receptionList.receptionDate = '';
    receptionList.receptionTime = '';
    receptionList.rankNo = 0;
    receptionList.id = 0;
    this.receptionEmmit.emit(receptionList);
    $('#patientList').modal('hide');
    this.isShowReception = true;
  }
}
