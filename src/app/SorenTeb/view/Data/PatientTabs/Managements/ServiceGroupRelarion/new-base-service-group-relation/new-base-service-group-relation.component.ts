import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {PatientDetailBaseComponent} from '../../../patient-detail-base/patient-detail-base.component';
import {BaseServiceFirstListModelDto} from '../../../../../../model/Base/BaseService/base-service-first-list-model-dto';
import {NgForm} from '@angular/forms';
import {BaseServiceGroupRelationListModelDto} from '../../../../../../model/Base/BaseService/base-service-group-relation-list-model-dto';
import {EnumMessageType} from '../../../../../../controller/general/notification.service';
import {BaseServiceGroupRelationService} from '../../../../../../controller/Base/BaseServices/base-service-group-relation.service';
import {BaseUserModelDto} from '../../../../../../model/Base/User/base-user-model-dto';
import {BaseServiceGroupRelationFilterDto} from '../../../../../../model/filter/base-service-group-relation-filter-dto';
import {BaseServiceFilterDto} from '../../../../../../model/filter/base-service-filter-dto';
import {BaseServiceParaclinicChildService} from '../../../../../../controller/Base/BaseServices/base-service-paraclinic-child.service';
import {BaseServiceParaclinicChildListModelDto} from '../../../../../../model/Base/ServiceParaclinic/base-service-paraclinic-child-list-model-dto';
import {BaseServiceParaclinicFilterDto} from '../../../../../../model/filter/base-service-paraclinic-filter-dto';
import {BaseServiceGroupListModelDto} from '../../../../../../model/Base/BaseService/base-service-group-list-model-dto';
import {BaseServiceGroupService} from '../../../../../../controller/Base/BaseServices/base-service-group.service';
import {BaseServiceGroupFilterDto} from '../../../../../../model/filter/base-service-group-filter-dto';

declare var $: any;

@Component({
  selector: 'app-new-base-service-group-relation',
  templateUrl: './new-base-service-group-relation.component.html',
  styleUrls: ['./new-base-service-group-relation.component.css']
})
export class NewBaseServiceGroupRelationComponent extends PatientDetailBaseComponent implements OnInit, OnChanges {

  @Input() baseServiceGroupRelation: BaseServiceGroupRelationListModelDto;
  @Input() selectParaclinicChildId: number;

  @ViewChild('f') registerForm: NgForm;
  public listItems: Array<{ text: string, value: number }> = [];
  userInfo: BaseUserModelDto;
  baseServiceParaclinicFilterDto = new BaseServiceParaclinicFilterDto();
  baseServiceParaclinicChildListModelDto: Array<BaseServiceParaclinicChildListModelDto>;
  lstServciceGroupList: Array<BaseServiceGroupListModelDto>;
  private baseServiceGroupFilterDto = new  BaseServiceGroupFilterDto();

  constructor(private baseServiceGroupRelationService: BaseServiceGroupRelationService
              , private baseServiceParaclinicChildService: BaseServiceParaclinicChildService,
              private  baseServiceGroup: BaseServiceGroupService
              ) {
    super();

  }


  ngOnChanges(): void {
   // this.refereshServiceGroup();
    this.baseServiceParaclinicFilterDto.baseParaclinicChildId = this.baseServiceGroupRelation.baseParaclinicChildId;
    this.baseServiceGroupFilterDto.baseParaclinicChildId = this.baseServiceGroupRelation.baseParaclinicChildId;
    this.refereshServiceGroup();
    this.refereshServiceParaclinic();
    console.log('عجبا');
    }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('sorenTeb-user-storage'));
    // this.baseServiceParaclinicFilterDto.baseParaclinicChildId = this.baseServiceGroupRelation.baseParaclinicChildId;
    // this.baseServiceGroupFilterDto.baseParaclinicChildId = this.baseServiceGroupRelation.baseParaclinicChildId;
    if (this.userInfo !== undefined && this.userInfo !== null && this.userInfo.id !== 0) {
      {
        for (const item of this.userInfo.baseUserParaclinicChildModel) {

          this.listItems.push({text: item.paraclinicChildName, value: item.baseParaclinicChildId});
        }
      }

      console.log('لیست پاراکلینیک');
      console.log(this.listItems);



    }

  }


  createBaseService() {



    this.makeResponse(this.baseServiceGroupRelationService.createServiceGroupRelation(this.baseServiceGroupRelation), true, resultObject => {
      console.log('موقع ثبت سرویس و گروس سرویس');
      console.log(resultObject.result);
      if (resultObject !== null && resultObject.result !== null) {
        this.notificationService.toastMessage(EnumMessageType.success, 'عملیات موفق', 'ثبت با موفقیت انجام شد');
        this.baseServiceGroupRelationService.subjectRefereshBaseServiceGroupRelation.next(true);
        this.registerForm.reset();

        $('#NewServiceGroupRelationList').modal('hide');

      }
    });

  }

  onSubmit() {
    this.createBaseService();
  }

  valueChangeParaclinic(e) {
    this.baseServiceParaclinicFilterDto.baseParaclinicChildId = e;
    this.refereshServiceParaclinic();
    this.baseServiceGroupFilterDto.baseParaclinicChildId = e;
    this.refereshServiceGroup();
  }


  refereshServiceParaclinic() {
    this.makeResponse(this.baseServiceParaclinicChildService.getAllBaseServiceParaclinicChild(this.baseServiceParaclinicFilterDto), true, resultObject => {

      if (resultObject.results) {
        this.baseServiceParaclinicChildListModelDto = resultObject.results;

        console.log('سرویس پاراکلینیک');
        console.log(this.baseServiceParaclinicChildListModelDto);
      }
    });
  }



  refereshServiceGroup() {
    console.log('فیلتر گروه سرویس');
    console.log(this.baseServiceGroupFilterDto);

    this.makeResponse(this.baseServiceGroup.getAllBaseServiceGroup(this.baseServiceGroupFilterDto), true, resultObject => {

      if (resultObject.results) {
        this.lstServciceGroupList = resultObject.results;
        console.log('لیست گروه سرویس');
        console.log(this.lstServciceGroupList);


      }
    });
  }



  valueChangeService(e) {
    console.log('سرویس انتخاب شده');
    console.log(e);
    this.baseServiceGroupRelation.baseServiceId = e;

  }

  public handleFilter(value) {
    console.log('فیلتر کردن.');
    console.log(value);
    if (value !== '') {
      this.baseServiceParaclinicChildListModelDto = this.baseServiceParaclinicChildListModelDto.filter((s) => s.serviceName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    } else {
      this.refereshServiceParaclinic();
    }


  }

  valueGroupId(e) {
    this.baseServiceGroupRelation.baseServiceGroupId = e;
  }
}
