import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {PatientDetailBaseComponent} from '../patient-detail-base/patient-detail-base.component';
import {ReceptionModelByIdModelDto} from '../../../../model/Data/Reception/reception-model-by-id-model-dto';
import {PublicMessageService} from '../../../../controller/general/Message/public-message.service';
import {ReceptionService} from '../../../../controller/DataTables/Receptions/reception.service';
import {NgForm} from '@angular/forms';
import {EnumMessageType} from '../../../../controller/general/notification.service';
import {ReceptionDto} from '../../../../model/Data/Reception/reception-dto';
import {SecurityFilterDto} from '../../../../model/filter/security-filter-dto';
import {BeneficiaryFilterDto} from '../../../../model/filter/beneficiary-filter-dto';
import {AuthService} from '../../../../controller/Base/auth.service';
import {BaseBeneficiaryService} from '../../../../controller/Base/Beneficiary/base-beneficiary.service';
import {BaseBeneficiaryListModelDto} from '../../../../model/Base/Beneficiary/base-beneficiary-list-model-dto';
import {BaseInsuranceService} from '../../../../controller/Base/Insurance/base-insurance.service';
import {BaseInsuranceFilterDto} from '../../../../model/filter/base-insurance-filter-dto';
import {BaseInsuranceListModelDto} from '../../../../model/Base/Insurance/base-insurance-list-model-dto';
import {BaseServiceService} from '../../../../controller/Base/BaseServices/base-service.service';
import {BaseServiceGroupService} from '../../../../controller/Base/BaseServices/base-service-group.service';
import {BaseServiceFilterDto} from '../../../../model/filter/base-service-filter-dto';
import {BaseServiceGroupFilterDto} from '../../../../model/filter/base-service-group-filter-dto';
import {SortDescriptor, State} from '@progress/kendo-data-query';
import {DataStateChangeEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ReceptionFilterDto} from '../../../../model/filter/reception-filter-dto';
import {PatientReceptionServiceFilterDto} from '../../../../model/filter/patient-reception-service-filter-dto';
import {PatientReceptionServiceService} from '../../../../controller/DataTables/Receptions/patient-reception-service.service';
import {ReceptionServiceModelByIdModelDto} from '../../../../model/Data/Reception/reception-service-model-by-id-model-dto';
import {ReceptionListReceptionServiceModelDto} from '../../../../model/Data/Reception/reception-list-reception-service-model-dto';
import {PatientReceptionServiceDto} from '../../../../model/Data/Reception/patient-reception-service-dto';
import {BaseUserModelDto} from '../../../../model/Base/User/base-user-model-dto';
import {BaseServiceRoutinDetailListModelDto} from '../../../../model/Base/BaseService/base-service-routin-detail-list-model-dto';
import {BaseServiceRoutinFilterDto} from '../../../../model/filter/base-service-routin-filter-dto';
import {ReceptionListReceptionListModelDto} from '../../../../model/Data/Reception/reception-list-reception-list-model-dto';
import {conditionallyCreateMapObjectLiteral} from '@angular/compiler/src/render3/view/util';
import {BaseServiceRoutinDetailMainListModelDto} from '../../../../model/Base/BaseService/base-service-routin-detail-main-list-model-dto';
import {EditService} from '../../../../controller/config/edit.service';
import { map } from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import {createUrlResolverWithoutPackagePrefix} from '@angular/compiler';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import {Select2OptionData} from 'ng-select2';
declare var $: any;

@Component({
  selector: 'app-reception-patient',
  templateUrl: './reception-patient.component.html',
  styleUrls: ['./reception-patient.component.css']
})
export class ReceptionPatientComponent extends PatientDetailBaseComponent implements OnInit {

  public exampleData = {} as Array<Select2OptionData>;
  public cId: number;
  public receptionId;
  public serviceIndexQuantity: number;
  public routin: number;
  @Input() index = 1;
  // public gridData: GridDataResult;
  public buttonCount = 5;
  public info = true;
  public type: 'numeric' | 'input' = 'numeric';
  public pageSizes = true;
  public previousNext = true;
  public pageSize = 5;
  public skip = 0;
  public sort: SortDescriptor[];
  public state: State;
  // @Input() receptionById: ReceptionModelByIdModelDto;
  @Input() receptionById: ReceptionListReceptionServiceModelDto;


  // @Input() receptionServiceModelByIdModelDtoMain: ReceptionServiceModelByIdModelDtoMain;


  @ViewChild('f') registerForm: NgForm;
  @Input() receptionDto = new ReceptionDto();
  receptionFilterD = new ReceptionFilterDto();

  @Input() receptionListReceptionServiceModelDto = new ReceptionListReceptionServiceModelDto();

  beneficiaryFilterDto = new BeneficiaryFilterDto();
  baseInsuranceFilterDto = new BaseInsuranceFilterDto();
  baseServiceFilterDto = new BaseServiceFilterDto();
  patientReceptionServiceFilterDto = new PatientReceptionServiceFilterDto();
  receptionFilterDto = new ReceptionFilterDto();
  receptionServiceModelByIdModelDto = new ReceptionServiceModelByIdModelDto();
  // receptionServiceModelByIdModelDtoMain: Array<PatientReceptionServiceDto>;
  @Input() receptionServiceModelByIdModelDtoMain: PatientReceptionServiceDto[];
  receptionServiceModelByIdModelDtoMains: Array<PatientReceptionServiceDto>;
  baseServiceRoutinDetailListModelDto: Array<BaseServiceRoutinDetailListModelDto>;
  baseServiceRoutinDetailMainListModelDto: Array<BaseServiceRoutinDetailMainListModelDto>;

  receptionList: Array<ReceptionListReceptionListModelDto>;
  receptionListCount: number;

  lastNameSearch: string;
  receptionModel: any;

  baseServiceRoutinFilterDto = new BaseServiceRoutinFilterDto();
  receptionServiceCalculatedList: any;
  // @ts-ignore
  gridData: GridDataResult = {data: this.receptionServiceModelByIdModelDtoMain, total: this.totalListRowCount};
  // gridData: new GridDataResult;

  public serviceId: number;
  public birthDateS: string;
  public serviceName: string;
  public isShowModal: boolean;
  public  age: number;
  baseServiceGroupFilterDto = new BaseServiceGroupFilterDto();
  datePickerConfig = {
    format: 'jYYYY/jMM/jDD',

  };
  @ViewChild('textDate') textDate: ElementRef;
  @ViewChild('textDate2') textDate2: ElementRef;
  @ViewChild('textDate3') textDate3: ElementRef;
  @ViewChild('textDate4') textDate4: ElementRef;
  // public listItems: Array<{ text: string , value: number}> = [];
  //  public listItems: any[] = [
  //    {
  //      text: 'Furniture', id: 1, items: [
  //        { text: 'Tables & Chairs', id: 2 },
  //        { text: 'Sofas', id: 3 },
  //        { text: 'Occasional Furniture', id: 4 }
  //      ]
  //    },
  //
  //  ]


  public listItems = new Array<{ id: number, name: string }>({id: 1, name: 'سال'}, {
    id: 2, name: 'ماه'
  }, {id: 3, name: 'روز'});


  public listSex = new Array<{ id: number, name: string }>({id: 1, name: 'مرد'}, {id: 0, name: 'زن'});


  public listLocation: Array<{ text: string, value: number }> = [];
  public lstParaclinicChild: Array<{ text: string, value: number }> = [];
  public lstBeneficiaryList: any;
  public lstServciceGroupList: any;
  public lstServciceList: any;
  public lstServciceListSelect: any;
  // public lstBaseInsuranceList: any;
  public isInsurancePercent: boolean;

  public lstBaseInsuranceList: [BaseInsuranceListModelDto];
  public lstBaseInsuranceListWithId: [BaseInsuranceListModelDto];


  Introductiondata = new BaseBeneficiaryListModelDto();

  public baseUserParaclinicChildList: Array<{ text: string, value: number }> = [];
  userInfo: BaseUserModelDto;
  public defultInsuranceCode: number;
  public insuranceRate: number;
  public insuranceShareRate: number;
  public patientShareRate: number;
  public freeRate: number;
  public outOfRate: number;
  public mustPay: number;
  public  discountRate: number;
  public  paymentRate: number;
  public  totalDiscountRate: number;
  persiancurrentDate: string;
  constructor(private message: PublicMessageService, private receptionService: ReceptionService, private  baseBeneficiaryService: BaseBeneficiaryService,
              private baseInsuranceService: BaseInsuranceService, private baseServiceService: BaseServiceService, private  baseServiceGroup: BaseServiceGroupService,
              private activatedRoute: ActivatedRoute, private router: Router, private patientReceptionServiceService: PatientReceptionServiceService,
              private editService: EditService
  ) {
    super();
    this.persiancurrentDate = new Date().toLocaleDateString('fa-IR');
    console.log(this.persiancurrentDate);
    this.insuranceRate = 0;
    this.insuranceShareRate = 0;
    this.patientShareRate = 0;
    this.mustPay = 0;
    this.freeRate = 0;
    this.outOfRate = 0;
    this.discountRate = 0;
    this.totalDiscountRate = 0;
    this.paymentRate = 0;
    this.isShowModal = false;
    this.gridData.data = undefined;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.cId = params.id;


    });

  }



CalculatedMustPay()
{
  this.mustPay =  (this.patientShareRate + this.outOfRate + (this.freeRate - this.insuranceRate )) - this.receptionById.discountRate;


}

  calculatedsalaryRateRate()
  {
    this.insuranceRate = 0;
    this.insuranceShareRate = 0;
    this.patientShareRate = 0;
    this.mustPay = 0;
    this.freeRate = 0;
    this.outOfRate = 0;
    console.log('لیست گرید');
    console.log(this.gridData.data);
    this.receptionServiceCalculatedList.forEach(item => {



      this.insuranceRate = this.insuranceRate + item.insuranceRate;
      this.insuranceShareRate = this.insuranceShareRate + item.insuranceShareRate;
      this.patientShareRate = this.patientShareRate + item.patientShareRate;
      this.freeRate = this.freeRate + item.freeRate;
      this.outOfRate = this.outOfRate + item.outOfRate;
      this.CalculatedMustPay();
    });

  }


  ngOnInit(): void {

    // this.exampleData = [
    //   {
    //     id: 'basic1',
    //     text: 'بیسیک 1'
    //   },
    //   {
    //     id: 'basic2',
    //     disabled: true,
    //     text: 'Basic 2'
    //   },
    //   {
    //     id: 'basic3',
    //     text: 'Basic 3'
    //   },
    //   {
    //     id: 'basic4',
    //     text: 'Basic 4'
    //   }
    // ];

    console.log('تاریخ جارییییییییییییییییییی');

    this.persiancurrentDate = new Date().toLocaleDateString('fa-IR');
    console.log(this.persiancurrentDate);

    console.log(this.receptionServiceModelByIdModelDtoMain);
    this.userInfo = JSON.parse(localStorage.getItem('sorenTeb-user-storage'));

    this.lstParaclinicChild = JSON.parse(localStorage.getItem('sorenTeb-paraclinicChildList-storage'));
    this.beneficiaryFilterDto.baseParaclinicChildId = JSON.parse(localStorage.getItem('sorenTeb-paraclinicChildId-storage'));
    this.baseInsuranceFilterDto.baseParaclinicChildId = JSON.parse(localStorage.getItem('sorenTeb-paraclinicChildId-storage'));
    this.baseServiceGroupFilterDto.baseParaclinicChildId = JSON.parse(localStorage.getItem('sorenTeb-paraclinicChildId-storage'));
    this.baseServiceFilterDto.baseParaclinicChildId = JSON.parse(localStorage.getItem('sorenTeb-paraclinicChildId-storage'));


    // this.receptionListReceptionServiceModelDto.receptionCode = '1400';
    // this.receptionListReceptionServiceModelDto.documentCode = '00-00-01';


    this.refereshBeneficiary();
    this.refereshInsurance();
    this.state = {skip: 0, take: 5, sort: this.sort};
    // this.refereshServiceGroup();
    // this.refereshService();
    this.receptionFilterDto.receptionId = this.cId;
    this.refereshReceptionService(this.receptionFilterDto);

    // this.gridData.data = this.receptionServiceModelByIdModelDtoMain;
    this.getListRoutin();
    this.CalculatedMustPay();

  }


  refereshBeneficiary() {

    this.makeResponse(this.baseBeneficiaryService.getAllBeneficiary(this.beneficiaryFilterDto), true, resultObject => {
      if (resultObject.results) {
        this.lstBeneficiaryList = resultObject.results;
        console.log('پزشکان قابل دسترسی');
        console.log(resultObject.results);

      }
    });
  }


  refereshServiceGroup() {
    this.makeResponse(this.baseServiceGroup.getAllBaseServiceGroup(this.baseServiceGroupFilterDto), true, resultObject => {

      if (resultObject.results) {
        this.lstServciceGroupList = resultObject.results;


      }
    });
  }


  GetCalculatedService(insuranceId: number, serviceId: number, indexQuantity: number, paraclinicChildId: number, franshiPercent: number, isFree: boolean, iSNC: boolean, serviceName: string) {
    this.patientReceptionServiceFilterDto.insuranceId = insuranceId;
    this.patientReceptionServiceFilterDto.serviceId = serviceId;
    this.patientReceptionServiceFilterDto.indexQuantity = indexQuantity;
    this.patientReceptionServiceFilterDto.paraclinicChildId = paraclinicChildId;
    this.patientReceptionServiceFilterDto.franshiPercent = franshiPercent;
    this.patientReceptionServiceFilterDto.isFree = isFree;
    this.patientReceptionServiceFilterDto.isNC = iSNC;
    this.patientReceptionServiceFilterDto.serviceName = serviceName;


    this.makeResponse(this.patientReceptionServiceService.getPatientReceptionServiceByIdQuery(this.patientReceptionServiceFilterDto), true, resultObject => {
      if (resultObject != null && resultObject.result != null) {

        this.receptionServiceModelByIdModelDto = resultObject.result;


        this.receptionServiceModelByIdModelDtoMain.push(this.receptionServiceModelByIdModelDto);
        this.receptionServiceModelByIdModelDtoMain[this.receptionServiceModelByIdModelDtoMain.length - 1].serviceName = serviceName;


        this.gridData.data = this.receptionServiceModelByIdModelDtoMain.slice(this.skip, this.skip + this.pageSize);
        this.gridData.data = this.receptionServiceModelByIdModelDtoMain;
        this.receptionById.receptionServiceModelByIdModel = this.receptionServiceModelByIdModelDtoMain;
        this.receptionServiceCalculatedList = this.gridData.data;

        console.log('نرخ بیمه واقع در جدول');
        console.log(this.receptionServiceModelByIdModelDtoMain);
        this.calculatedsalaryRateRate();

      }
    });
  }


  refereshService() {
    this.makeResponse(this.baseServiceService.getAllBaseService(this.baseServiceFilterDto), true, resultObject => {
      if (resultObject.results) {
        this.lstServciceList = resultObject.results;
        console.log('سرویس قابل دسترسی');
        console.log(resultObject.results);

      }
    });
  }


  refereshInsurance() {
    this.makeResponse(this.baseInsuranceService.getAllBaseInsurance(this.baseInsuranceFilterDto), true, resultObject => {
      if (resultObject.results) {
        this.lstBaseInsuranceList = resultObject.results;


        if (this.lstBaseInsuranceList.find(a => a.isDefultInsurance === true) !== undefined) {
          this.defultInsuranceCode = this.lstBaseInsuranceList.find(a => a.isDefultInsurance === true).id !== null ? this.lstBaseInsuranceList.find(a => a.isDefultInsurance === true).id : 0;
        }

        if (this.defultInsuranceCode !== 0 && (this.receptionById.insuranceCode === null || this.receptionById.insuranceCode === 0)) {
          this.receptionById.insuranceCode = this.defultInsuranceCode;
          this.receptionById.insurancePercent = this.lstBaseInsuranceList.find(a => a.id === this.receptionById.insuranceCode).franshizPercent;
        }
        console.log('بیمه های قابل دسترسی');
        console.log(this.lstBaseInsuranceList);

        // console.log('بیمه پیش فرض');
        // console.log(this.lstBaseInsuranceList.find(a => a.isDefultInsurance === true).id);

        // if (this.isInsurancePercent === true) {
        //   this.receptionById.insurancePercent = this.lstBaseInsuranceList[0].franshizPercent;
        // }


      }
    });
  }


  refereshInsuranceWithId(insuranceCode: number) {
    this.baseInsuranceFilterDto.insuranceId = insuranceCode;
    this.makeResponse(this.baseInsuranceService.getAllBaseInsurance(this.baseInsuranceFilterDto), true, resultObject => {
      if (resultObject.results) {
        this.lstBaseInsuranceListWithId = resultObject.results;

        this.receptionById.insurancePercent = this.lstBaseInsuranceListWithId[0].franshizPercent;


      }
    });
  }


  refereshReceptionService(receptionFilterDto: ReceptionFilterDto) {


    this.patientReceptionServiceService.subjectReceptionService.subscribe(isRefresh => {
      if (isRefresh === true) {


        this.receptionFilterDto.receptionId = this.cId;
        this.makeResponse(this.patientReceptionServiceService.getAllReceptionServiceByReceptionId(this.receptionFilterDto), true, resultObject => {
          if (resultObject.results) {


            this.receptionServiceModelByIdModelDtoMains = resultObject.results;
            this.gridData.data = this.receptionServiceModelByIdModelDtoMains.slice(this.skip, this.skip + this.pageSize);
            this.gridData.data = this.receptionServiceModelByIdModelDtoMains;
            this.receptionServiceCalculatedList = this.gridData.data;
            this.calculatedsalaryRateRate();
          }
        });
      }
    });
  }


  DeleteService(receptionFilterDto: ReceptionFilterDto) {

    console.log('عجبااااااااا');
    console.log(receptionFilterDto);
    this.makeResponse(this.patientReceptionServiceService.DeletePatientReceptionService(receptionFilterDto), true, resultObject => {
      console.log(resultObject);
      if (resultObject !== null || resultObject.result != null) {
        this.notificationService.toastMessage(EnumMessageType.success, 'عملیات موفق', 'ثبت با موفقیت انجام شد');
        this.receptionModel = resultObject.result;
        this.receptionId = resultObject.result.id;
      }
    });
  }

  createReception() {

    if (this.registerForm.valid) {
      // this.receptionById.rankNo = 1;
      // this.receptionListReceptionServiceModelDto.id = 0;
      this.receptionById.baseParaclinicChildId = JSON.parse(localStorage.getItem('sorenTeb-paraclinicChildId-storage'));

      this.receptionById.mustPay = this.mustPay;
      this.receptionById.discountRate = this.totalDiscountRate;
      this.makeResponse(this.receptionService.createReception(this.receptionById), true, resultObject => {
        console.log(resultObject);
        if (resultObject !== null || resultObject.result != null) {
          this.notificationService.toastMessage(EnumMessageType.success, 'عملیات موفق', 'ثبت با موفقیت انجام شد');
          this.receptionModel = resultObject.result;
          this.receptionId = resultObject.result.id;


          this.receptionFilterDto.receptionServiceModelByIdModelDto = this.receptionServiceModelByIdModelDtoMain;
          this.receptionFilterDto.receptionServiceModelByIdModelDto.forEach(item => {
            item.receptionCode = this.receptionModel.receptionCode;
            item.receptionId = this.receptionModel.id;


          });
          // this.router.navigate(['/receptionpanel/' + this.receptionId]);

          if (this.receptionFilterDto.receptionId === 0) {
            console.log('مقدار فیلتر');
            console.log(this.receptionFilterDto.receptionId);
            this.registerForm.reset();
          }


          this.receptionFilterDto.receptionId = this.receptionId;
          this.router.navigate(['/receptionpanel/' + this.receptionId]);
          // window.location.reload();

        }
      });


    }


  }


  bindDataReceptionId() {
    // console.log('ای وای بر من ');
    // this.receptionFilterDto.receptionId = this.receptionId;
    this.makeResponse(this.receptionService.getReceptionByIdQuery(this.receptionFilterDto), true, resultObject => {

      if (resultObject.result) {
        this.receptionById = resultObject.result;

      }
    });
  }

  onSubmit() {
    // if (this.cId === 0) {

    this.createReception();
  }


  valueChangeAgeType($event: any) {

  }

  valueChangeLocation($event: any) {

  }

  valueChangeSex($event: any) {

  }

  valueChangeIntroduction2(value: any) {
    this.receptionById.introduction2 = value;
  }

  valueChangeInsurance(e) {

    this.refereshInsuranceWithId(e);


  }


  valueChangeRoutin(e) {
    this.getListRoutin();
  }


  valueBaseBeneficiaryId(e) {
    this.receptionById.baseBeneficiaryId = e;
    this.baseServiceGroupFilterDto.baseBeneficiaryId = this.receptionListReceptionServiceModelDto.baseBeneficiaryId;
    this.refereshServiceGroup();

  }

  valueGroupId(e) {
    this.baseServiceGroupFilterDto.baseBeneficiaryId = this.receptionListReceptionServiceModelDto.baseBeneficiaryId;
    this.baseServiceFilterDto.serviceGroupId = e;
    this.refereshService();
  }

  valueServiceChange(e) {
    console.log('یک');
    console.log(e);
    this.serviceId = e.id;

    this.serviceName = e.serviceName;

    console.log('نام سرویس');
    console.log(this.serviceName);
  }

  dataStateChange(state: DataStateChangeEvent) {
    this.state.take = state.take;
    this.state.skip = state.skip;
    this.state.sort = state.sort;
    this.gridData.data = this.receptionServiceModelByIdModelDtoMain.slice(this.skip, this.skip + this.pageSize);
    this.gridData.data = this.receptionServiceModelByIdModelDtoMain;
  }

  public pageChange({skip, take}: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.gridData.data = this.receptionServiceModelByIdModelDtoMain.slice(this.skip, this.skip + this.pageSize);

  }


  InsertService(e) {
    this.receptionFilterDto.serviceId = this.serviceId;
    this.receptionFilterDto.insuranceId = this.receptionListReceptionServiceModelDto.insuranceCode;
    if (this.serviceIndexQuantity === null || this.serviceIndexQuantity === 0 || this.serviceIndexQuantity === undefined) {
      this.serviceIndexQuantity = 1;
    }

    if (this.receptionById.insuranceCode === null || this.receptionById.insuranceCode === 0 || this.receptionById.insuranceCode === undefined) {
      this.notificationService.toastMessage(EnumMessageType.danger, 'خطا', 'لطفا بیمه مورد نظر را انتخاب کنید');
    } else {
      this.GetCalculatedService(this.receptionById.insuranceCode, this.serviceId, this.serviceIndexQuantity, this.baseServiceFilterDto.baseParaclinicChildId, this.receptionById.insurancePercent, false, false, this.serviceName);

    }


  }


  renewReception(receptionFilterDto: ReceptionFilterDto) {
    this.makeResponse(this.receptionService.getAllReceptionList(this.receptionFilterDto), true, resultObject => {
      if (resultObject.results) {
        this.receptionList = resultObject.results;
        // this.gridData.data = this.receptionList;
        this.receptionListCount = this.receptionList.length;


        console.log('مقدار this.lastNameSearch');
        console.log(this.lastNameSearch);
        console.log('مقدار this.receptionListCount ');
        console.log(this.receptionListCount);


        if (this.lastNameSearch !== undefined && this.lastNameSearch !== '' && this.receptionListCount > 0) {
          this.isShowModal = true;
        } else {
          this.isShowModal = false;
        }

        if (this.isShowModal === true) {


          setTimeout(() => {


            this.receptionService.subjectReception.next(true);
            $('#patientList').modal('show');

          }, 100);


        }


      }
    });
  }



  getListRoutin()
  {

    this.baseServiceRoutinFilterDto.baseParaclinicChildId = JSON.parse(localStorage.getItem('sorenTeb-paraclinicChildId-storage'));
    this.makeResponse(this.baseServiceService.getAllBaseRoutinListMain(this.baseServiceRoutinFilterDto), true, resultObject => {
      if (resultObject.results) {
        this.baseServiceRoutinDetailMainListModelDto = resultObject.results;

      }
    });
  }

  InsertRoutin(routinId: number) {
    console.log('کد روتین');
    console.log(routinId);
    if (routinId === undefined || routinId === 0 || routinId === null ) {

      this.notificationService.toastMessage(EnumMessageType.danger, 'خطا', 'لطفا کد روتین را انتخاب کنید.');
    }

    else
    {
      // this.getListRoutin(routinId);

      this.baseServiceRoutinFilterDto.routinId = routinId;
      this.baseServiceRoutinFilterDto.baseParaclinicChildId = JSON.parse(localStorage.getItem('sorenTeb-paraclinicChildId-storage'));
      this.makeResponse(this.baseServiceService.getAllBaseRoutinList(this.baseServiceRoutinFilterDto), true, resultObject => {
        if (resultObject.results) {
          this.baseServiceRoutinDetailListModelDto = resultObject.results;

        }
      });


      setTimeout(() => {
          this.receptionFilterDto.insuranceId = this.receptionListReceptionServiceModelDto.insuranceCode;

          this.baseServiceRoutinDetailListModelDto.forEach(item => {

            // this.receptionFilterDto.serviceId = item.baseServiceId;


            this.GetCalculatedService(this.receptionById.insuranceCode, item.baseServiceId, item.indexQuantity, this.baseServiceFilterDto.baseParaclinicChildId, this.receptionById.insurancePercent, false, false, item.serviceName);


          });
        }, 3000);
    }
    // this.calculatedsalaryRateRate();
  }

  setGroups() {
    this.baseServiceGroupFilterDto.baseBeneficiaryId = this.receptionListReceptionServiceModelDto.baseBeneficiaryId;
    this.refereshServiceGroup();
    console.log('اکبر');
  }

  SetReceptionRenewed(receptionById: ReceptionListReceptionServiceModelDto) {

    console.log('آیا باید نمایش داده شود ؟');
    console.log(this.receptionById.lastName);

    if (receptionById.id === 0) {
      this.lastNameSearch = receptionById.lastName;
      this.receptionFilterDto.paraclinicChildId = JSON.parse(localStorage.getItem('sorenTeb-paraclinicChildId-storage'));
      this.receptionFilterDto.lastName = receptionById.lastName;
      this.receptionFilterDto.receptionId = 0;
      console.log('مقدار فیلترر');
      console.log(this.receptionFilterDto);
      this.renewReception(this.receptionFilterDto);


    }


  }

  getReception(receptionById: ReceptionListReceptionServiceModelDto) {
    this.receptionById = receptionById;


  }

  public removeHandler(receptionServiceModelByIdModelDtoMain: PatientReceptionServiceDto[], rowIndex: number) {

    if (confirm('آیا برای حذف مطمئن هستید؟')) {
    console.log('مقدار سرویس مورد نظر برای حذف');
    console.log(rowIndex);
    console.log(receptionServiceModelByIdModelDtoMain);


    if (this.receptionServiceModelByIdModelDtoMain[0].id !== 0)
    {
      this.receptionFilterDto.receptionServiceModelByIdModelDto = receptionServiceModelByIdModelDtoMain;
      this.receptionFilterDto.receptionServiceId = this.receptionServiceModelByIdModelDtoMain[0].id;

      console.log('مقدار آیتم مناسب جهت حذف');
      console.log(this.receptionFilterDto.receptionServiceModelByIdModelDto);
      console.log(this.receptionFilterDto);
      this.DeleteService(this.receptionFilterDto);
    }
    this.receptionServiceModelByIdModelDtoMain.splice(rowIndex, 1);
    this.gridData.data = this.receptionServiceModelByIdModelDtoMain.slice(this.skip, this.skip + this.pageSize);
    this.gridData.data = this.receptionServiceModelByIdModelDtoMain;
    this.receptionServiceCalculatedList = this.gridData.data;
    this.calculatedsalaryRateRate();
  }

  }


  onDelete(receptionServiceModelByIdModelDtoMain: PatientReceptionServiceDto[]) {


    console.log('مقدار سرویس مورد نظر برای حذف');
    console.log(receptionServiceModelByIdModelDtoMain);
    // this.gridData.data = this.receptionServiceModelByIdModelDtoMain.slice(this.skip, this.skip + this.pageSize);
    // this.gridData.data = this.receptionServiceModelByIdModelDtoMain;

    }

  // onDelete(receptionServiceModelByIdModelDtoMain: number) {
  //   console.log('مقدار سرویس مورد نظر برای حذف');
  //   console.log(receptionServiceModelByIdModelDtoMain);
  //
  // }

  CalculatedDiscountRate(discountRate: number) {

console.log('میزان تخفیف');
console.log(discountRate);
if (discountRate >= 0 && discountRate <= 100)
{
  this.totalDiscountRate = this.mustPay * discountRate / 100;
}
else if (discountRate > 100)
{
  this.totalDiscountRate = discountRate;
}
this.receptionById.discountRate = this.totalDiscountRate;
console.log('مبلغ کل تخفیف');
console.log(this.totalDiscountRate);
// this.mustPay = (this.patientShareRate + this.outOfRate + (this.freeRate - this.insuranceRate )) - this.totalDiscountRate;
this.CalculatedMustPay();

console.log('مبلغ کل قابل پرداخت');
console.log(this.mustPay);

  }

  SetBirthDate(age: number) {



    const x = this.convertPersianToEnglish(this.persiancurrentDate.substring(0, 4));
    // @ts-ignore
    this.birthDateS = (Number(x) - age).toString() + '/01/01';
    this.receptionById.birthDate = this.birthDateS;
  }


  SetAge(birthDate: string) {
    if (birthDate.length === 10)
    {
      const x = this.convertPersianToEnglish(this.persiancurrentDate.substring(0, 4));
      this.age = Number(x) - Number(birthDate.substring(0, 4));
      this.receptionById.age = this.age;

    }
  }
}
