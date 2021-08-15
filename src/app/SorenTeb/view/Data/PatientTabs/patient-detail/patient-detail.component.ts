import { Component, OnInit } from '@angular/core';
import {PatientDetailBaseComponent} from '../patient-detail-base/patient-detail-base.component';
import {ReceptionModelByIdModelDto} from '../../../../model/Data/Reception/reception-model-by-id-model-dto';
import {ReceptionFilterDto} from '../../../../model/filter/reception-filter-dto';
import {ReceptionService} from '../../../../controller/DataTables/Receptions/reception.service';
import {ActivatedRoute, Params} from '@angular/router';
import {ReceptionListReceptionServiceModelDto} from '../../../../model/Data/Reception/reception-list-reception-service-model-dto';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
})
export class PatientDetailComponent extends PatientDetailBaseComponent implements OnInit {

  public receptionById = new ReceptionListReceptionServiceModelDto();
  public receptionFilter = new ReceptionFilterDto();
  public cId: number;

  public receptionId: number;

  constructor(private receptionService: ReceptionService, private activatedRoute: ActivatedRoute) {
    super();
    this.activatedRoute.params.subscribe((params: Params) => {
      this.cId = params.id;
    });
  }

  ngOnInit(): void {
    this.bindDataReceptionId();
  }


  bindDataReceptionId() {

    this.receptionFilter.receptionId = this.cId
    this.makeResponse(this.receptionService.getReceptionByIdQuery(this.receptionFilter), true, resultObject => {


      if (resultObject.result) {
        this.receptionById = resultObject.result;
      }
    });



  }

}
