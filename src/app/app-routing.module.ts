import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './SorenTeb/view/auth/login/login.component';
import {DashboardComponent} from './SorenTeb/view/input/dashboard/dashboard.component';
import {LogoutComponent} from './SorenTeb/view/auth/logout/logout.component';
import {PageGuard} from './SorenTeb/model/main/page-guard';
import {ReceptionTabComponent} from './SorenTeb/view/Data/PatientTabs/reception-tab/reception-tab.component';
import {ReceptionPatientComponent} from './SorenTeb/view/Data/PatientTabs/reception-patient/reception-patient.component';
import {BaseServiceGroupComponent} from './SorenTeb/view/Data/PatientTabs/Managements/ServiceGroups/base-service-group/base-service-group.component';
import {BaseServiceGroupListComponent} from './SorenTeb/view/Data/PatientTabs/Managements/ServiceGroups/base-service-group-list/base-service-group-list.component';
import {GroupServiceParaclinicChildComponent} from './SorenTeb/view/Data/PatientTabs/Managements/ServiceGroups/group-service-paraclinic-child/group-service-paraclinic-child.component';
import {BaseBeneficiarySpecialComponent} from './SorenTeb/view/Data/PatientTabs/Managements/Special/base-beneficiary-special/base-beneficiary-special.component';
import {BaseBeneficiaryGroupsComponent} from './SorenTeb/view/Data/PatientTabs/Managements/BeneficiaryGroup/base-beneficiary-groups/base-beneficiary-groups.component';
import {BaseBeneficiaryListComponent} from './SorenTeb/view/Data/PatientTabs/Managements/BaseBeneficiary/base-beneficiary-list/base-beneficiary-list.component';
import {BeneficiaryParaclinicChildListComponent} from './SorenTeb/view/Data/PatientTabs/Managements/BaseBeneficiary/BeneficiaryParaclinic/beneficiary-paraclinic-child-list/beneficiary-paraclinic-child-list.component';
import {ParaclinicChildListComponent} from './SorenTeb/view/Data/PatientTabs/Managements/Paraclinic/paraclinic-child-list/paraclinic-child-list.component';
import {BaseBeneficiaryGroupServiceListComponent} from './SorenTeb/view/Data/PatientTabs/Managements/BeneficiaryGroupServices/base-beneficiary-group-service-list/base-beneficiary-group-service-list.component';
import {BaseServiceListComponent} from './SorenTeb/view/Data/PatientTabs/Managements/BaseServices/base-service-list/base-service-list.component';
import {ServiceParaclinicChildListComponent} from './SorenTeb/view/Data/PatientTabs/Managements/ServiceParaclinic/service-paraclinic-child-list/service-paraclinic-child-list.component';
import {BaseServiceGroupRelationListComponent} from './SorenTeb/view/Data/PatientTabs/Managements/ServiceGroupRelarion/base-service-group-relation-list/base-service-group-relation-list.component';
import {BaseInsurancListComponent} from './SorenTeb/view/Data/PatientTabs/Managements/Insurance/base-insuranc-list/base-insuranc-list.component';
import {BaseCertificateTypeListComponent} from './SorenTeb/view/Data/PatientTabs/Managements/Certificate/base-certificate-type-list/base-certificate-type-list.component';
import {BaseInsuranceParaclinicChildListComponent} from './SorenTeb/view/Data/PatientTabs/Managements/InsuranceParaclinicChild/base-insurance-paraclinic-child-list/base-insurance-paraclinic-child-list.component';
import {BaseServiceRoutinListComponent} from './SorenTeb/view/Data/PatientTabs/Managements/Routin/ServiceRoutin/base-service-routin-list/base-service-routin-list.component';
import {RoutinTabComponent} from './SorenTeb/view/Data/PatientTabs/Managements/Routin/routin-tab/routin-tab.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'receptionpanel/:id', component: ReceptionTabComponent},
  {path: 'receptionPatient/0', component: ReceptionPatientComponent},
  {path: 'groupService/:id', component: BaseServiceGroupComponent},
  {path: 'groupServiceList', component: BaseServiceGroupListComponent},
  {path: 'groupServiceParaclinic', component: GroupServiceParaclinicChildComponent},
  {path: 'beneficiarySpecial', component: BaseBeneficiarySpecialComponent},
  {path: 'beneficiaryGroups', component: BaseBeneficiaryGroupsComponent},
  {path: 'baseBeneficiary', component: BaseBeneficiaryListComponent},
  {path: 'beneficiaryParaclinicChild', component: BeneficiaryParaclinicChildListComponent},
  {path: 'paraclinicChildList', component: ParaclinicChildListComponent},
  {path: 'beneficiaryGroupServiceList', component: BaseBeneficiaryGroupServiceListComponent},
  {path: 'baseServiceList', component: BaseServiceListComponent},
  {path: 'baseServiceParaclinic', component: ServiceParaclinicChildListComponent},
  {path: 'baseServiceGroupRelationList', component: BaseServiceGroupRelationListComponent},
  {path: 'baseInsurancList', component: BaseInsurancListComponent},
  {path: 'certificateTypeList', component: BaseCertificateTypeListComponent},
  {path: 'insuranceParaclinicChildList', component: BaseInsuranceParaclinicChildListComponent},
  {path: 'serviceRoutinList', component: RoutinTabComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

