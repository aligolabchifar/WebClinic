import { BrowserModule } from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent} from './SorenTeb/view/auth/login/login.component';
import {BasePageComponent} from './SorenTeb/controller/general/base-page/base-page.component';
import {DashboardComponent} from './SorenTeb/view/input/dashboard/dashboard.component';
import {BaseMemberPanelPageComponent} from './SorenTeb/controller/config/base-member-panel-page/base-member-panel-page.component';
import {SidebarComponent} from './SorenTeb/view/general/sidebar/sidebar.component';
import {LogoutComponent} from './SorenTeb/view/auth/logout/logout.component';
import {NavbarComponent} from './SorenTeb/view/general/navbar/navbar.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {InputsModule} from '@progress/kendo-angular-inputs';
import {AutoCompleteModule, ComboBoxModule, MultiSelectModule} from '@progress/kendo-angular-dropdowns';
import {LoadingBarModule} from '@ngx-loading-bar/core';
import {UserService} from './SorenTeb/controller/Base/user.service';
import { BreadCrumbComponent } from './SorenTeb/view/general/bread-crumb/bread-crumb.component';
import { ReceptionComponent } from './SorenTeb/view/input/reception/reception.component';
import { DefaultPanelComponent } from './SorenTeb/view/general/default-panel/default-panel.component';
import { PatientDetailComponent } from './SorenTeb/view/Data/PatientTabs/patient-detail/patient-detail.component';
import {PatientDetailBaseComponent} from './SorenTeb/view/Data/PatientTabs/patient-detail-base/patient-detail-base.component';
import { ReceptionTabComponent } from './SorenTeb/view/Data/PatientTabs/reception-tab/reception-tab.component';
import { ReceptionPatientComponent } from './SorenTeb/view/Data/PatientTabs/reception-patient/reception-patient.component';
import {GridModule, RowFilterModule} from '@progress/kendo-angular-grid';
import {LoadingComponent} from './SorenTeb/view/template/loading/loading.component';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import { NotificationComponent } from './SorenTeb/view/utils/notification/notification.component';
import {ToastrModule} from 'ngx-toastr';
import {MemberPanelInterceptorService} from './SorenTeb/controller/member-panel-interceptor.service';
import { PatientListComponent } from './SorenTeb/view/Data/PatientTabs/patient-list/patient-list.component';
import { DefaultModalComponent } from './SorenTeb/view/template/default-modal/default-modal.component';
import { BaseServiceGroupComponent } from './SorenTeb/view/Data/PatientTabs/Managements/ServiceGroups/base-service-group/base-service-group.component';
import { BaseServiceGroupListComponent } from './SorenTeb/view/Data/PatientTabs/Managements/ServiceGroups/base-service-group-list/base-service-group-list.component';
import { GroupServiceParaclinicChildComponent } from './SorenTeb/view/Data/PatientTabs/Managements/ServiceGroups/group-service-paraclinic-child/group-service-paraclinic-child.component';
import { NewServiceGroupParaclinicChildComponent } from './SorenTeb/view/Data/PatientTabs/Managements/ServiceGroups/new-service-group-paraclinic-child/new-service-group-paraclinic-child.component';
import {RTL} from '@progress/kendo-angular-l10n';
import { BaseBeneficiarySpecialComponent } from './SorenTeb/view/Data/PatientTabs/Managements/Special/base-beneficiary-special/base-beneficiary-special.component';
import { BaseBeneficiaryGroupsComponent } from './SorenTeb/view/Data/PatientTabs/Managements/BeneficiaryGroup/base-beneficiary-groups/base-beneficiary-groups.component';
import { NewBaseBeneficiarySpecialComponent } from './SorenTeb/view/Data/PatientTabs/Managements/Special/new-base-beneficiary-special/new-base-beneficiary-special.component';
import { NewBaseBeneficiaryGroupComponent } from './SorenTeb/view/Data/PatientTabs/Managements/BeneficiaryGroup/new-base-beneficiary-group/new-base-beneficiary-group.component';
import { BaseBeneficiaryListComponent } from './SorenTeb/view/Data/PatientTabs/Managements/BaseBeneficiary/base-beneficiary-list/base-beneficiary-list.component';
import { NewBaseBeneficiaryComponent } from './SorenTeb/view/Data/PatientTabs/Managements/BaseBeneficiary/new-base-beneficiary/new-base-beneficiary.component';
import { BeneficiaryParaclinicChildListComponent } from './SorenTeb/view/Data/PatientTabs/Managements/BaseBeneficiary/BeneficiaryParaclinic/beneficiary-paraclinic-child-list/beneficiary-paraclinic-child-list.component';
import { NewBeneficiaryParaclinicChildComponent } from './SorenTeb/view/Data/PatientTabs/Managements/BaseBeneficiary/BeneficiaryParaclinic/new-beneficiary-paraclinic-child/new-beneficiary-paraclinic-child.component';
import { ParaclinicChildListComponent } from './SorenTeb/view/Data/PatientTabs/Managements/Paraclinic/paraclinic-child-list/paraclinic-child-list.component';
import { NewParaclinicChildComponent } from './SorenTeb/view/Data/PatientTabs/Managements/Paraclinic/new-paraclinic-child/new-paraclinic-child.component';
import { BaseBeneficiaryGroupServiceListComponent } from './SorenTeb/view/Data/PatientTabs/Managements/BeneficiaryGroupServices/base-beneficiary-group-service-list/base-beneficiary-group-service-list.component';
import { NewBaseBeneficiaryGroupServiceComponent } from './SorenTeb/view/Data/PatientTabs/Managements/BeneficiaryGroupServices/new-base-beneficiary-group-service/new-base-beneficiary-group-service.component';
import { BaseServiceListComponent } from './SorenTeb/view/Data/PatientTabs/Managements/BaseServices/base-service-list/base-service-list.component';
import { NewBaseServiceComponent } from './SorenTeb/view/Data/PatientTabs/Managements/BaseServices/new-base-service/new-base-service.component';
import { ServiceParaclinicChildListComponent } from './SorenTeb/view/Data/PatientTabs/Managements/ServiceParaclinic/service-paraclinic-child-list/service-paraclinic-child-list.component';
import { NewServiceParaclinicComponent } from './SorenTeb/view/Data/PatientTabs/Managements/ServiceParaclinic/new-service-paraclinic/new-service-paraclinic.component';
import { NgSelect2Module} from 'ng-select2';
import { BaseServiceGroupRelationListComponent } from './SorenTeb/view/Data/PatientTabs/Managements/ServiceGroupRelarion/base-service-group-relation-list/base-service-group-relation-list.component';
import { NewBaseServiceGroupRelationComponent } from './SorenTeb/view/Data/PatientTabs/Managements/ServiceGroupRelarion/new-base-service-group-relation/new-base-service-group-relation.component';
import { BaseInsurancListComponent } from './SorenTeb/view/Data/PatientTabs/Managements/Insurance/base-insuranc-list/base-insuranc-list.component';
import { NewBaseInsuranceComponent } from './SorenTeb/view/Data/PatientTabs/Managements/Insurance/new-base-insurance/new-base-insurance.component';
import { BaseCertificateTypeListComponent } from './SorenTeb/view/Data/PatientTabs/Managements/Certificate/base-certificate-type-list/base-certificate-type-list.component';
import { NewCertificateComponent } from './SorenTeb/view/Data/PatientTabs/Managements/Certificate/new-certificate/new-certificate.component';
import { BaseInsuranceParaclinicChildListComponent } from './SorenTeb/view/Data/PatientTabs/Managements/InsuranceParaclinicChild/base-insurance-paraclinic-child-list/base-insurance-paraclinic-child-list.component';
import { NewBaseInsuranceParaclinicChildComponent } from './SorenTeb/view/Data/PatientTabs/Managements/InsuranceParaclinicChild/new-base-insurance-paraclinic-child/new-base-insurance-paraclinic-child.component';
import { BaseServiceRoutinListComponent } from './SorenTeb/view/Data/PatientTabs/Managements/Routin/ServiceRoutin/base-service-routin-list/base-service-routin-list.component';
import { RoutinTabComponent } from './SorenTeb/view/Data/PatientTabs/Managements/Routin/routin-tab/routin-tab.component';
import { RoutinParaclinicChildListComponent } from './SorenTeb/view/Data/PatientTabs/Managements/Routin/RoutinParaclinic/routin-paraclinic-child-list/routin-paraclinic-child-list.component';
import { BaseServiceRoutinDetailListComponent } from './SorenTeb/view/Data/PatientTabs/Managements/Routin/RoutinList/base-service-routin-detail-list/base-service-routin-detail-list.component';
import { ServiceRoutinNewComponent } from './SorenTeb/view/Data/PatientTabs/Managements/Routin/ServiceRoutin/service-routin-new/service-routin-new.component';
import { RoutinParaclinicChildNewComponent } from './SorenTeb/view/Data/PatientTabs/Managements/Routin/RoutinParaclinic/routin-paraclinic-child-new/routin-paraclinic-child-new.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BasePageComponent,
    LoadingComponent,
    DashboardComponent,
    BaseMemberPanelPageComponent,
    SidebarComponent,
    LogoutComponent,
    NavbarComponent,
    BreadCrumbComponent,
    ReceptionComponent,
    DefaultPanelComponent,
    PatientDetailComponent,
    PatientDetailBaseComponent,
    ReceptionTabComponent,
    ReceptionPatientComponent,
    NotificationComponent,
    PatientListComponent,
    DefaultModalComponent,
    BaseServiceGroupComponent,
    BaseServiceGroupListComponent,
    GroupServiceParaclinicChildComponent,
    NewServiceGroupParaclinicChildComponent,
    BaseBeneficiarySpecialComponent,
    BaseBeneficiaryGroupsComponent,
    NewBaseBeneficiarySpecialComponent,
    NewBaseBeneficiaryGroupComponent,
    BaseBeneficiaryListComponent,
    NewBaseBeneficiaryComponent,
    BeneficiaryParaclinicChildListComponent,
    NewBeneficiaryParaclinicChildComponent,
    ParaclinicChildListComponent,
    NewParaclinicChildComponent,
    BaseBeneficiaryGroupServiceListComponent,
    NewBaseBeneficiaryGroupServiceComponent,
    BaseServiceListComponent,
    NewBaseServiceComponent,
    ServiceParaclinicChildListComponent,
    NewServiceParaclinicComponent,
    BaseServiceGroupRelationListComponent,
    NewBaseServiceGroupRelationComponent,
    BaseInsurancListComponent,
    NewBaseInsuranceComponent,
    BaseCertificateTypeListComponent,
    NewCertificateComponent,
    BaseInsuranceParaclinicChildListComponent,
    NewBaseInsuranceParaclinicChildComponent,
    BaseServiceRoutinListComponent,
    RoutinTabComponent,
    RoutinParaclinicChildListComponent,
    BaseServiceRoutinDetailListComponent,
    ServiceRoutinNewComponent,
    RoutinParaclinicChildNewComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    InputsModule,
    AutoCompleteModule,
    ComboBoxModule,
    MultiSelectModule,
    LoadingBarModule,
    RowFilterModule,
    DpDatePickerModule,
    NgSelect2Module,

    GridModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
      // preventDuplicates: true,
      closeButton: false,
      timeOut: 5000
    }),
  ],
  providers: [

    {provide: RTL, useValue: true},
    UserService,
    {provide: HTTP_INTERCEPTORS, useClass: MemberPanelInterceptorService, multi: true}],
  bootstrap: [AppComponent],

})
export class AppModule {
  static injector: Injector;
  constructor(injector: Injector) {
    AppModule.injector = injector;
  }
}
