import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {PatientDetailBaseComponent} from '../../../patient-detail-base/patient-detail-base.component';
import {BaseServiceParaclinicChildListModelDto} from '../../../../../../model/Base/ServiceParaclinic/base-service-paraclinic-child-list-model-dto';
import {FormControl, NgForm} from '@angular/forms';
import {BaseServiceParaclinicChildService} from '../../../../../../controller/Base/BaseServices/base-service-paraclinic-child.service';
import {EnumMessageType} from '../../../../../../controller/general/notification.service';
import {CaliforniaFilterDto} from '../../../../../../model/filter/california-filter-dto';
import {BaseCaliforniaListModelDto} from '../../../../../../model/Base/California/base-california-list-model-dto';
import {BaseServiceFilterDto} from '../../../../../../model/filter/base-service-filter-dto';
import {BaseServiceService} from '../../../../../../controller/Base/BaseServices/base-service.service';
import {BaseServiceListModelDto} from '../../../../../../model/Base/BaseService/base-service-list-model-dto';
import {BaseUserModelDto} from '../../../../../../model/Base/User/base-user-model-dto';
import {BaseServiceFirstListModelDto} from '../../../../../../model/Base/BaseService/base-service-first-list-model-dto';
import {isNumeric} from 'tslint';
import {Select2OptionData} from 'ng-select2';

declare var $: any;
@Component({
  selector: 'app-new-service-paraclinic',
  templateUrl: './new-service-paraclinic.component.html',
  styleUrls: ['./new-service-paraclinic.component.css'],
})

export class NewServiceParaclinicComponent extends PatientDetailBaseComponent implements OnInit {
  @Input() baseServiceParaclinicChild: BaseServiceParaclinicChildListModelDto;

  baseCaliforniaListModelDto: Array<BaseCaliforniaListModelDto>;
  lstServciceList: Array<BaseServiceFirstListModelDto>;
  baseServiceFilterDto = new BaseServiceFilterDto();
  baseCalifornia  = new BaseCaliforniaListModelDto();

  public listItems: Array<{ text: string, value: number }> = [];
  userInfo: BaseUserModelDto;

  @ViewChild('f') registerForm: NgForm;
  californiaFilterDto = new CaliforniaFilterDto();
  public exampleData = {} as Array<Select2OptionData>;
  formControl = new FormControl();
  constructor(private baseServiceParaclinicChildService: BaseServiceParaclinicChildService,
              private baseServiceService: BaseServiceService) {
    super();
  }

  ngOnInit(): void {

    this.exampleData = [
      {
        id: '1903',
        text: 'بیسیک 1'
      },
      {
        id: '22',
        disabled: true,
        text: 'Basic 2'
      },
      {
        id: '33',
        text: 'Basic 3'
      },
      {
        id: '44',
        text: 'Basic 4'
      }
    ];
    this.userInfo = JSON.parse(localStorage.getItem('sorenTeb-user-storage'));
    this.refereshCalifornia();
    this.refereshService();

    if (this.userInfo !== undefined && this.userInfo !== null && this.userInfo.id !== 0) {
      {
        for (const item of this.userInfo.baseUserParaclinicChildModel) {

          this.listItems.push({text: item.paraclinicChildName, value: item.baseParaclinicChildId});
        }
      }
    }

  }


  refereshService() {
    this.makeResponse(this.baseServiceService.getAllBaseServiceFirst(this.baseServiceFilterDto), true, resultObject => {
      if (resultObject.results) {
        this.lstServciceList = resultObject.results;
        console.log('سرویس قابل دسترسی');
        console.log(resultObject.results);

      }
    });
  }

  refereshCalifornia() {
    this.makeResponse(this.baseServiceParaclinicChildService.getAllBaseCaliforniaListQuery(this.californiaFilterDto), true, resultObject => {

      if (resultObject.results) {
        this.baseCaliforniaListModelDto = resultObject.results;
        console.log('لیست کد های کالیفرنیا');
        console.log(this.baseCaliforniaListModelDto);
      }
    });
  }


  createBaseServiceParaclinicChild() {


    this.makeResponse(this.baseServiceParaclinicChildService.createtBaseServiceParaclinicChild(this.baseServiceParaclinicChild), true, resultObject => {
      console.log('موقع ثبت سرویس');
      console.log(resultObject.result);
      if (resultObject !== null && resultObject.result !== null) {
        this.notificationService.toastMessage(EnumMessageType.success, 'عملیات موفق', 'ثبت با موفقیت انجام شد');
        this.baseServiceParaclinicChildService.subjectRefereshBaseServiceParaclinicChild.next(true);
        this.registerForm.reset();

        $('#NewBaseServiceParaclinicChild').modal('hide');

      }
    });

  }

  onSubmit() {
    this.createBaseServiceParaclinicChild();
  }

  valueChangeService(e) {
    this.baseServiceParaclinicChild.baseServiceId = e;

  }

  valueChangeParaclinic(e) {
    this.baseServiceParaclinicChild.baseParaclinicChildId = e;
  }

  public handleFilter(value) {
    console.log('فیلتر کردن.');
    console.log(value);
    if (value !== '') {
      this.lstServciceList = this.lstServciceList.filter((s) => s.serviceName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    } else {
      this.refereshService();
    }


  }

  valueChangeCalifornia(e) {
    console.log('انتخاب کالیفرنیا.');
    console.log(e);
    this.baseServiceParaclinicChild.californiaCode = e;


    this.californiaFilterDto.californiaCode = e;
    this.makeResponse(this.baseServiceParaclinicChildService.getAllBaseCaliforniaListQuery(this.californiaFilterDto), true, resultObject => {

      if (resultObject.results) {
        this.baseCalifornia = resultObject.results[0];
        this.baseServiceParaclinicChild.baseCaliforniaID = this.baseCalifornia.id;
        this.baseServiceParaclinicChild.indexQuantity = this.baseCalifornia.indexQuantity;
        this.baseServiceParaclinicChild.indexQuantityAbsence = this.baseCalifornia.indexQuantityAbsence;
        this.baseServiceParaclinicChild.indexQuantityTechnical = this.baseCalifornia.indexQuantityTechnical;
        console.log('انتخاب کالیفرنیا');
        console.log(this.baseCalifornia);
      }
    });

  }

  handleFilterCalifornia(value) {

    if (value !== '') {

      // tslint:disable-next-line:use-isnan
      console.log('مقدار کالیفرنیا');
      console.log(value);
      console.log(Number(value.toString()));


      if (isNaN(Number(value.toString()) ))
      {


        this.baseCaliforniaListModelDto = this.baseCaliforniaListModelDto.filter
        ((s) => s.californiaName.toLowerCase().indexOf(value.toLowerCase()) !== -1);




      }
     else
      {

        console.log(isNaN(NaN));
        this.baseCaliforniaListModelDto = this.baseCaliforniaListModelDto.filter
        ((s) => s.californiaCode.toLowerCase().indexOf(value.toLowerCase()) !== -1);

      }




    } else {
      this.refereshCalifornia();
    }

  }

  Filterselect2(e) {
    console.log('مقدار فیلتر 2 ');
    console.log(e);
  }
}
