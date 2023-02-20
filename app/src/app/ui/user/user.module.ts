import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './pages/user/user.component';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { SharedModule } from '../../shared/shared.module';
import { DataModule } from '../../data/data.module';
import { CompanyEditComponent } from './components/company-edit/company-edit.component';
import { EmployeeInfoComponent } from './components/employee-info/employee-info.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { CompanyComponent } from './pages/company/company.component';
import { HeaderEmployeeInfoComponent } from './components/header-employee-info/header-employee-info.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EditExperiencesComponent } from './components/edit-experiences/edit-experiences.component';
import { EditEducationComponent } from './components/edit-education/edit-education.component';
import { EditCertificationComponent } from './components/edit-certification/edit-certification.component';

@NgModule({
  declarations: [
    UserComponent,
    CompanyInfoComponent,
    CompanyEditComponent,
    EmployeeInfoComponent,
    EmployeeComponent,
    CompanyComponent,
    HeaderEmployeeInfoComponent,
    EmployeeEditComponent,
    EditExperiencesComponent,
    EditEducationComponent,
    EditCertificationComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    IonicModule,
    SharedModule,
    DataModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [DatePipe],
  exports: [EmployeeInfoComponent],
})
export class UserModule {}
