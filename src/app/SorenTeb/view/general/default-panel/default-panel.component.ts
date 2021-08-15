import {Component, Input, OnInit} from '@angular/core';
import {BaseServiceGroupService} from '../../../controller/Base/BaseServices/base-service-group.service';
import {BaseServiceGroupParaclinicChildService} from '../../../controller/Base/BaseServices/base-service-group-paraclinic-child.service';
import {BaseBeneficiarySpecialService} from '../../../controller/Base/Specials/base-beneficiary-special.service';
import {BaseBeneficiaryGroupsService} from '../../../controller/Base/BeneficiaryGroup/base-beneficiary-groups.service';
import {BaseBeneficiaryService} from '../../../controller/Base/Beneficiary/base-beneficiary.service';
import {BaseBeneficiaryParaclinicChildService} from '../../../controller/Base/Beneficiary/base-beneficiary-paraclinic-child.service';
import {BaseParaclinicChildService} from '../../../controller/Base/ParaclinicChild/base-paraclinic-child.service';
import {BaseBeneficiaryGroupServiceService} from '../../../controller/Base/BeneficiaryGroup/base-beneficiary-group-service.service';
import {BaseServiceService} from '../../../controller/Base/BaseServices/base-service.service';
import {BaseServiceParaclinicChildService} from '../../../controller/Base/BaseServices/base-service-paraclinic-child.service';
import {BaseServiceGroupRelationService} from '../../../controller/Base/BaseServices/base-service-group-relation.service';
import {BaseInsuranceDto} from '../../../model/Base/Insurance/base-insurance-dto';
import {BaseInsuranceService} from '../../../controller/Base/Insurance/base-insurance.service';
import {BaseCertificateTypeService} from '../../../controller/Base/Certificate/base-certificate-type.service';
import {BaseInsuranceParaclinicChildService} from '../../../controller/Base/InsuranceParaclinicChild/base-insurance-paraclinic-child.service';
import {BaseServiceRoutinService} from '../../../controller/Base/Routin/base-service-routin.service';
import {RoutinParaclinicChildService} from '../../../controller/Base/Routin/routin-paraclinic-child.service';

@Component({
  selector: 'app-default-panel',
  templateUrl: './default-panel.component.html'
})
export class DefaultPanelComponent implements OnInit {
  @Input() headerTitle: string;
  @Input() panelId: string;
  @Input() faIcon = '';
  parentName: string;
  @Input() isNewItem: boolean;

  constructor(private baseServiceGroupService: BaseServiceGroupService, private baseServiceGroupParaclinicChildService: BaseServiceGroupParaclinicChildService
    , private  baseBeneficiarySpecialService: BaseBeneficiarySpecialService, private  baseBeneficiaryGroupService: BaseBeneficiaryGroupsService,
              private  baseBeneficiaryService: BaseBeneficiaryService, private baseBeneficiaryParaclinicChildService: BaseBeneficiaryParaclinicChildService
    , private  baseParaclinicChildService: BaseParaclinicChildService, private baseBeneficiaryGroupServiceService: BaseBeneficiaryGroupServiceService
    , private baseServiceService: BaseServiceService, private baseServiceParaclinicChildService: BaseServiceParaclinicChildService,
              private  baseServiceGroupRelationService: BaseServiceGroupRelationService, private baseInsuranceService: BaseInsuranceService,
              private baseCertificateTypeService: BaseCertificateTypeService
    , private  baseInsuranceParaclinicChildService: BaseInsuranceParaclinicChildService
    , private baseServiceRoutinService: BaseServiceRoutinService, private routinParaclinicChildService: RoutinParaclinicChildService
  ) {
  }


  // baseBeneficiarySpecialLists
  ngOnInit(): void {
  }

  reloadPages(panelId) {
    this.parentName = panelId;
  }


  newItem(panelId) {
    this.parentName = panelId;
    this.isNewItem = true;

    console.log('panelId');
    console.log(panelId);

    if (panelId === 'baseServiceGroupLists') {
      this.baseServiceGroupService.subjectNewServiceGroup.next(true);
    } else if (panelId === 'baseServiceGroupParaclinics') {
      this.baseServiceGroupParaclinicChildService.subjectNewServiceGroupParaclinic.next(true);
    } else if (panelId === 'baseBeneficiarySpecialLists') {
      this.baseBeneficiarySpecialService.subjectNewBaseBeneficiarySpecial.next(true);
    } else if (panelId === 'baseBeneficiaryGroupsLists') {
      this.baseBeneficiaryGroupService.subjectNewBaseBeneficiaryGroup.next(true);
    } else if (panelId === 'baseBeneficiaryLists') {
      this.baseBeneficiaryService.subjectNewBaseBeneficiary.next(true);
    } else if (panelId === 'baseBeneficiaryParaclinicLists') {
      this.baseBeneficiaryParaclinicChildService.subjectNewBaseBeneficiaryParaclinicChild.next(true);
    } else if (panelId === 'baseParaclinicLists') {
      this.baseParaclinicChildService.subjectNewBaseParaclinicChild.next(true);
    } else if (panelId === 'baseBeneficiaryGroupServiceLists') {
      this.baseBeneficiaryGroupServiceService.subjectNewBaseBeneficiaryGroupService.next(true);
    } else if (panelId === 'baseServiceLists') {
      this.baseServiceService.subjectNewBaseService.next(true);
    } else if (panelId === 'baseServiceParaclinicLists') {
      this.baseServiceParaclinicChildService.subjectNewBaseServiceParaclinicChild.next(true);

    } else if (panelId === 'baseServiceGroupRelationLists') {
      this.baseServiceGroupRelationService.subjectNewBaseServiceGroupRelation.next(true);
    } else if (panelId === 'baseInsuranceLists') {
      this.baseInsuranceService.subjectNewBaseInsurance.next(true);
    } else if (panelId === 'baseCertificateLists') {
      this.baseCertificateTypeService.subjectNewBaseCertificate.next(true);
    } else if (panelId === 'baseInsuranceParaclinicLists') {
      this.baseInsuranceParaclinicChildService.subjectNewInsuranceParaclinicChild.next(true);
    } else if (panelId === 'baseServiceRoutinLists') {
      this.baseServiceRoutinService.subjectNewBaseServiceRoutin.next(true);
    }
    else if (panelId === 'routinParaclinicLists') {
      this.routinParaclinicChildService.subjectNewRoutinParaclinicChild.next(true);
    }

  }
}
