import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PatientDetailBaseComponent} from '../../../patient-detail-base/patient-detail-base.component';
import {NgForm} from '@angular/forms';
import {BaseServiceGroupModelDto} from '../../../../../../model/Base/BaseService/base-service-group-model-dto';
import {BaseServiceGroupService} from '../../../../../../controller/Base/BaseServices/base-service-group.service';
import {BaseServiceGroupParaclinicChildService} from '../../../../../../controller/Base/BaseServices/base-service-group-paraclinic-child.service';
import {EnumMessageType} from '../../../../../../controller/general/notification.service';
import {AuthService} from '../../../../../../controller/Base/auth.service';
import {BaseUserModelDto} from '../../../../../../model/Base/User/base-user-model-dto';
import {BaseServiceGroupFilterDto} from '../../../../../../model/filter/base-service-group-filter-dto';
import {BaseServiceGroupListTotalModelDto} from '../../../../../../model/Base/BaseService/base-service-group-list-total-model-dto';
declare var $: any;

@Component({
  selector: 'app-new-service-group-paraclinic-child',
  templateUrl: './new-service-group-paraclinic-child.component.html',
  styleUrls: ['./new-service-group-paraclinic-child.component.css']
})
export class NewServiceGroupParaclinicChildComponent extends PatientDetailBaseComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  @Input() baseServiceGroupDto: BaseServiceGroupModelDto;
  public listItems: Array<{ text: string , value: number}> = [];
  userInfo: BaseUserModelDto;
  listItemsGroupService: Array<{ text: string , value: number}> = [];
  baseServiceGroupListModelDto: Array<BaseServiceGroupListTotalModelDto>;
  baseServiceGroupFilterDto = new BaseServiceGroupFilterDto();

  constructor(private baseServiceGroupService: BaseServiceGroupParaclinicChildService, private baseServiceGroupService2: BaseServiceGroupService) {  super(); }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('sorenTeb-user-storage'));
    console.log('گروه سرویس های 2 ');
    console.log(this.baseServiceGroupDto);
    this.refereshServiceGroup();




    if (this.userInfo !== undefined && this.userInfo !== null && this.userInfo.id !== 0 ) {
      {
        for (const item of this.userInfo.baseUserParaclinicChildModel) {

          this.listItems.push({text: item.paraclinicChildName, value : item.baseParaclinicChildId});
        }
      }
    }
  }




  refereshServiceGroup() {
    this.makeResponse(this.baseServiceGroupService2.getAllBaseServiceGroupTotal(this.baseServiceGroupFilterDto), true, resultObject => {

      if (resultObject.results) {
        this.baseServiceGroupListModelDto = resultObject.results;
        console.log(this.baseServiceGroupListModelDto);

      }
    });
  }





  createServiceGroup() {



    this.makeResponse(this.baseServiceGroupService.createServiceGroupParaclinic(this.baseServiceGroupDto), true, resultObject => {
      console.log(resultObject);
      if (resultObject !== null && resultObject.result !== null) {
        this.notificationService.toastMessage(EnumMessageType.success, 'عملیات موفق', 'ثبت با موفقیت انجام شد');
        this.baseServiceGroupService.subjectRefereshServiceGroupParaclinic.next(true);
        this.registerForm.reset();
        $('#NewGroupParaclinicChild').modal('hide');

      }
    });

  }

  onSubmit() {
    // if (this.baseServiceGroupDto.baseServiceGroupName === '' || this.baseServiceGroupDto.baseServiceGroupName === null)
    // {
    //   this.notificationService.toastMessage(EnumMessageType.danger, 'خطا', 'لطفا نام گروه سرویس را انتخاب کنید');
    // }
    // else
    // {
      this.createServiceGroup();
    // }
  }

  valueChange(value: any) {
    this.baseServiceGroupDto.baseParaclinicChildId = value;
  }

  valueChangeGroup(value: any) {
    this.baseServiceGroupDto.groupId = value;
  }
}
