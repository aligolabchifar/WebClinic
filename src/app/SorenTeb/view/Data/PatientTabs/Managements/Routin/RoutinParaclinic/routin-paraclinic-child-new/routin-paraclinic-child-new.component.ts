import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BaseServiceRoutinParaclinicChildListModelDto} from '../../../../../../../model/Base/Routin/base-service-routin-paraclinic-child-list-model-dto';
import {PatientDetailBaseComponent} from '../../../../patient-detail-base/patient-detail-base.component';
import {NgForm} from '@angular/forms';
import {BaseUserModelDto} from '../../../../../../../model/Base/User/base-user-model-dto';
import {BaseServiceRoutinService} from '../../../../../../../controller/Base/Routin/base-service-routin.service';
import {BaseRoutinFilterDto} from '../../../../../../../model/filter/base-routin-filter-dto';
import {BaseRoutinListModelDto} from '../../../../../../../model/Base/Routin/base-routin-list-model-dto';
import {EnumMessageType} from '../../../../../../../controller/general/notification.service';
import {RoutinParaclinicChildService} from '../../../../../../../controller/Base/Routin/routin-paraclinic-child.service';
declare var $: any;

@Component({
  selector: 'app-routin-paraclinic-child-new',
  templateUrl: './routin-paraclinic-child-new.component.html',
  styleUrls: ['./routin-paraclinic-child-new.component.css']
})
export class RoutinParaclinicChildNewComponent  extends PatientDetailBaseComponent implements OnInit {
 @Input() baseServiceRoutinParaclinicChild = new BaseServiceRoutinParaclinicChildListModelDto();
  @ViewChild('f') registerForm: NgForm;
  public listItems: Array<{ text: string, value: number }> = [];
  userInfo: BaseUserModelDto;
  baseRoutinFilterDto = new BaseRoutinFilterDto();
  baseRoutinListModelDto: Array<BaseRoutinListModelDto>;

  constructor(private baseServiceRoutinService: BaseServiceRoutinService, private routinParaclinicChildService: RoutinParaclinicChildService) {
    super();
  }




  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('sorenTeb-user-storage'));
    this.refereshRoutin();

    if (this.userInfo !== undefined && this.userInfo !== null && this.userInfo.id !== 0) {
      {
        for (const item of this.userInfo.baseUserParaclinicChildModel) {

          this.listItems.push({text: item.paraclinicChildName, value: item.baseParaclinicChildId});
        }
      }
    }


  }





  refereshRoutin() {
    this.makeResponse(this.baseServiceRoutinService.getAllBaseServiceRoutin(this.baseRoutinFilterDto), true, resultObject => {

      if (resultObject.results) {
        this.baseRoutinListModelDto = resultObject.results;
        this.totalListRowCount = resultObject.totalRows;
        console.log('لیست روتین ها ');
        console.log(this.baseRoutinListModelDto);
      }
    });
  }


  createRoutinParaclinic() {
    this.makeResponse(this.routinParaclinicChildService.createtRoutinParaclinicChild(this.baseServiceRoutinParaclinicChild), true, resultObject => {
      console.log('موقع ثبت روتین');
      console.log(resultObject.result);
      if (resultObject !== null && resultObject.result !== null) {
        this.notificationService.toastMessage(EnumMessageType.success, 'عملیات موفق', 'ثبت با موفقیت انجام شد');
        this.routinParaclinicChildService.subjectRefereshRoutinParaclinicChild.next(true);
        this.registerForm.reset();

        $('#NewRoutinParaclinicChild').modal('hide');

      }
    });

  }


  valueRoutin(e) {

    this.baseServiceRoutinParaclinicChild.baseServiceRoutinId = e;
  }

  valueChangeParaclinic(e) {
    this.baseServiceRoutinParaclinicChild.baseParaclinicChildId = e;
  }

  onSubmit() {
    this.createRoutinParaclinic();
  }
}

