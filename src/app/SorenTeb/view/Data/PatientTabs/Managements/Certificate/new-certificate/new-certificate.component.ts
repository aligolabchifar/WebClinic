import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {PatientDetailBaseComponent} from '../../../patient-detail-base/patient-detail-base.component';
import {BaseCertificateTypeService} from '../../../../../../controller/Base/Certificate/base-certificate-type.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {BaseCertificateTypeListModelDto} from '../../../../../../model/Base/Certificate/base-certificate-type-list-model-dto';
import {EnumMessageType} from '../../../../../../controller/general/notification.service';
import {BaseUserModelDto} from '../../../../../../model/Base/User/base-user-model-dto';
import {SortDescriptor, State} from '@progress/kendo-data-query';
import {DataStateChangeEvent, GridComponent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {CertificateFilterDto} from '../../../../../../model/filter/certificate-filter-dto';
import {BaseCertificateTypeDto} from '../../../../../../model/Base/Certificate/base-certificate-type-dto';
import {BaseCertificateTypeFirstListModelDto} from '../../../../../../model/Base/Certificate/base-certificate-type-first-list-model-dto';
declare var $: any;



@Component({
  selector: 'app-new-certificate',
  templateUrl: './new-certificate.component.html',
  styleUrls: ['./new-certificate.component.css']
})
export class NewCertificateComponent extends PatientDetailBaseComponent implements OnInit, OnChanges , OnDestroy{

  @Input() baseCertificateTypeList: BaseCertificateTypeListModelDto;
  @Input() certificateTypeCode: number;
  @ViewChild('f') registerForm: NgForm;

  public lstRes: any;

  public listItems: Array<{ text: string, value: number }> = [];
  userInfo: BaseUserModelDto;
  baseCertificateTypeListModelDto: Array<BaseCertificateTypeListModelDto>;
  certificateFilterDto = new CertificateFilterDto();
  certificateNamestr: string;
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

  ngOnChanges(): void {
    if (this.certificateTypeCode !== 0 && this.certificateTypeCode !== null)
    {

      this.certificateFilterDto.certificateCode = this.certificateTypeCode;
      this.certificateNamestr = '';
      this.certificateFilterDto.certificateName = this.certificateNamestr;
      this.refereshCertificate();
      $('#patientList').modal('show');
    }
    else
    {
      setTimeout(() => {
        console.log('ایجادددددددددددد');
        this.certificateFilterDto = new CertificateFilterDto();
        this.certificateNamestr = '';
        this.baseCertificateTypeListModelDto = new Array< BaseCertificateTypeListModelDto>();
      // console.log('مقدار کد تعرفه 44 ');
      // console.log(this.baseCertificateTypeListModelDto);
        this.gridData.data = undefined;
      // this.gridData.data = this.baseCertificateTypeListModelDto;
      }, 1000);
    }
    }






  ngOnInit(): void {

    console.log('علییییییییییییییییی');
    this.userInfo = JSON.parse(localStorage.getItem('sorenTeb-user-storage'));
    if (this.userInfo !== undefined && this.userInfo !== null && this.userInfo.id !== 0) {
      {
        for (const item of this.userInfo.baseUserParaclinicChildModel) {

          this.listItems.push({text: item.paraclinicChildName, value: item.baseParaclinicChildId});
        }
      }
    }
    // if (this.certificateTypeCode !== 0 && this.certificateTypeCode !== null)
    // {
    //   this.certificateFilterDto.certificateCode = this.certificateTypeCode;
    //   this.refereshCertificate();
    // }

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

  public cellClickHandler({ sender, rowIndex, columnIndex, dataItem, isEdited }) {
    if (!isEdited) {
      sender.editCell(rowIndex, columnIndex);
    }
  }


  setCertificate(certificateNamestr: string) {
    console.log('مقدار نام تعرفه');
    console.log(certificateNamestr);
    this.certificateFilterDto.certificateName = certificateNamestr;

  }


  computeCertificate() {
    console.log('مقدار فیلتر های تعرفه ها ');
    console.log(this.certificateFilterDto);
    this.makeResponse(this.baseCertificateTypeService.operationCalculatedInsertIntoCertificate(this.certificateFilterDto), true, resultObject => {
      console.log('تعرفه ها بعد از اینسرت');
      console.log(resultObject);
      if (resultObject.result) {
        this.certificateFilterDto.certificateCode = resultObject.result;

        this.notificationService.toastMessage(EnumMessageType.success,
          'عملیات موفق', 'محاسبه تعرفه با موفقیت انجام شد');
        this.refereshCertificate();
      }
    });
  }


  onSubmit() {
    this.computeCertificate();
    // this.refereshCertificate();
  }


  refereshCertificate() {
    console.log('مقدار کد تعرفه 2 ');
    console.log(this.certificateFilterDto);
    this.makeResponse(this.baseCertificateTypeService.getAllBaseCertificateType(this.certificateFilterDto), true, resultObject => {
      if (resultObject.results) {
        this.baseCertificateTypeListModelDto = resultObject.results;
        this.gridData.data = this.baseCertificateTypeListModelDto;
        this.gridData.total = resultObject.totalRows;
        this.totalListRowCount = resultObject.totalRows;
        this.maxPageRows = resultObject.maxPageRows;
        console.log('تعرفه ها است');
        console.log(this.baseCertificateTypeListModelDto);

      }
    });
  }


  setCalculatedCertificate() {
    this.certificateFilterDto.baseCertificateTypeListModel = this.gridData.data;
    this.makeResponse(this.baseCertificateTypeService.setCertificateDetail(this.certificateFilterDto), true, resultObject => {
      if (resultObject.result) {
        this.lstRes = resultObject.result.result;
        this.certificateFilterDto.certificateCode = this.lstRes.baseCertificateCode;
        this.notificationService.toastMessage(EnumMessageType.success,
          'عملیات موفق', 'محاسبه تعرفه با موفقیت انجام شد');

        $('#NewBaseCertificate').modal('hide');
        // this.registerForm.reset();

        console.log('مقدار Rersult');
        console.log(this.lstRes);
        this.refereshCertificate();
        this.baseCertificateTypeService.subjectRefereshBaseCertificate.next(true);
      }
    });
  }

  ngOnDestroy(): void {
  }
}
