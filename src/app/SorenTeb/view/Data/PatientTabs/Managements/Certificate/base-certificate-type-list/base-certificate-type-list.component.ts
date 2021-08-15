import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PatientDetailBaseComponent} from '../../../patient-detail-base/patient-detail-base.component';
import {BaseCertificateTypeService} from '../../../../../../controller/Base/Certificate/base-certificate-type.service';
import {CertificateFilterDto} from '../../../../../../model/filter/certificate-filter-dto';
import {BaseCertificateTypeListModelDto} from '../../../../../../model/Base/Certificate/base-certificate-type-list-model-dto';
import {SortDescriptor, State} from '@progress/kendo-data-query';
import {DataStateChangeEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {BaseCertificateTypeFirstListModelDto} from '../../../../../../model/Base/Certificate/base-certificate-type-first-list-model-dto';
declare var $: any;

@Component({
  selector: 'app-base-certificate-type-list',
  templateUrl: './base-certificate-type-list.component.html',
  styleUrls: ['./base-certificate-type-list.component.css']
})
export class BaseCertificateTypeListComponent extends PatientDetailBaseComponent implements OnInit {

  certificateFilterDto = new CertificateFilterDto();
  baseCertificateTypeListModelDto: Array<BaseCertificateTypeListModelDto>;
  baseCertificateTypeList = new BaseCertificateTypeListModelDto();
  certificateTypeCode: number;




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


  gridData: GridDataResult = {data: this.baseCertificateTypeListModelDto, total: this.totalListRowCount};
  // @ts-ignore
  public state: State = {skip: 0, take: 5, sort: this.sort, filter: {logic: 'and', filters: []}};



  constructor(private baseCertificateTypeService: BaseCertificateTypeService) {
    super();
  }

  ngOnInit(): void {
    if (this.certificateTypeCode !== null && this.certificateTypeCode !== 0)
    {
      this.certificateFilterDto.certificateCode = this.certificateTypeCode;

    }

    this.state = {skip: 0, take: 5, sort: this.sort};
    this.refereshCertificate();


    this.baseCertificateTypeService.subjectRefereshBaseCertificate.subscribe(isRefresh => {
      if (isRefresh === true) {
        this.refereshCertificate();

      }
    });


    this.baseCertificateTypeService.subjectNewBaseCertificate.subscribe(isRefresh => {
      if (isRefresh === true) {
        console.log('ایجاد  تعرفه جدید');
        this.certificateTypeCode = 0;

        this.baseCertificateTypeList = new BaseCertificateTypeListModelDto();

        // $('#NewBaseCertificate').modal('show');



        // setTimeout(() => {
        console.log('ایجادددددددددددد');
        $('#NewBaseCertificate').modal('show');
        // }, 1000);

      }
    });


  }


  refereshCertificate() {
    this.makeResponse(this.baseCertificateTypeService.getAllBaseCertificateTypeFirst(this.certificateFilterDto), true, resultObject => {
      if (resultObject.results) {
        this.baseCertificateTypeListModelDto = resultObject.results;
        this.gridData.data = this.baseCertificateTypeListModelDto;
        this.gridData.total = resultObject.totalRows;
        this.totalListRowCount = resultObject.totalRows;
        this.maxPageRows = resultObject.maxPageRows;
        console.log('لیست تعرفه ها');
        console.log(this.baseCertificateTypeListModelDto);
      }
    });
  }

  dataStateChange(state: DataStateChangeEvent) {
    this.state.skip = state.skip;
    this.state.sort = state.sort;
    this.gridData.data = this.baseCertificateTypeListModelDto.slice(this.skip, this.skip + this.pageSize);
    this.certificateFilterDto.pageNumber = ((this.skip / this.pageSize) + 1).toString();
    // this.gridData.data = this.baseServiceGroupListModelDto;
  }

  public pageChange({skip, take}: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.gridData.data = this.baseCertificateTypeListModelDto;
    this.gridData.data = this.baseCertificateTypeListModelDto.slice(this.skip, this.skip + this.pageSize);
    // this.refereshServiceGroup();

  }

  editCetificateType(baseCertificateType: BaseCertificateTypeListModelDto) {
    this.certificateTypeCode = baseCertificateType.baseCertificateCode;
    console.log('مقدار کد تعرفه');
    console.log(this.certificateTypeCode);
    $('#NewBaseCertificate').modal('show');
  }

}
