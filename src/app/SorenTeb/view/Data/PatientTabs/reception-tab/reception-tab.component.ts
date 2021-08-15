import {Component, Input, OnInit} from '@angular/core';
import {PatientDetailBaseComponent} from '../patient-detail-base/patient-detail-base.component';
import {ReceptionModelByIdModelDto} from '../../../../model/Data/Reception/reception-model-by-id-model-dto';
import {ActivatedRoute, Params} from '@angular/router';
import {ReceptionFilterDto} from '../../../../model/filter/reception-filter-dto';
import {ReceptionService} from '../../../../controller/DataTables/Receptions/reception.service';
import {ReceptionListReceptionServiceModelDto} from '../../../../model/Data/Reception/reception-list-reception-service-model-dto';
import {ReceptionListReceptionListModelDto} from '../../../../model/Data/Reception/reception-list-reception-list-model-dto';
import {PatientReceptionServiceDto} from '../../../../model/Data/Reception/patient-reception-service-dto';
import {PatientReceptionServiceService} from '../../../../controller/DataTables/Receptions/patient-reception-service.service';
import {GridDataResult} from '@progress/kendo-angular-grid';


@Component({
  selector: 'app-reception-tab',
  templateUrl: './reception-tab.component.html'
})
export class ReceptionTabComponent extends PatientDetailBaseComponent implements OnInit {
  @Input() receptionById = new ReceptionListReceptionServiceModelDto();
  // @Input() receptionServiceModelByIdModelDtoMain: Array<PatientReceptionServiceDto>;
  @Input() receptionServiceModelByIdModelDtoMain: PatientReceptionServiceDto[] = [];
  baseUserParaclinicChildList: any;
  public receptionFilter = new ReceptionFilterDto();
  public receptionFilterDto = new ReceptionFilterDto();
  public cId: number;
  public isShowTab: boolean;
  receptionList: Array<ReceptionListReceptionListModelDto>;

  constructor(private activatedRoute: ActivatedRoute, private receptionService: ReceptionService, private patientReceptionServiceService: PatientReceptionServiceService) {
    super();

  }



  bindRefereshReceptionService() {
    console.log('مقدار سرویس پذیرش');

    this.receptionFilter.receptionId = this.cId;
    this.makeResponse(this.patientReceptionServiceService.getAllReceptionServiceByReceptionId(this.receptionFilter), true, resultObject => {
      if (resultObject.results) {


        this.receptionServiceModelByIdModelDtoMain = resultObject.results;
        this.patientReceptionServiceService.subjectReceptionService.next(true);


      }
    });
  }



  bindDataReceptionId() {

this.receptionFilter.receptionId = this.cId;
this.makeResponse(this.receptionService.getReceptionByIdQuery(this.receptionFilter), true, resultObject => {

      if (resultObject.result) {
        this.receptionById = resultObject.result;

      }
    });
  }

  ngOnInit(): void {

    console.log('بررررررررررررررررو');

    this.isShowTab = false;
    this.activatedRoute.params.subscribe((params: Params) => {


      this.cId = params.id;

      if (this.cId === 0)
      {


        this.receptionById = new ReceptionListReceptionServiceModelDto();
      }
      // if (this.cId !== 0)
      // {
      this.bindDataReceptionId();
      this.bindRefereshReceptionService();

    });
  }

}

