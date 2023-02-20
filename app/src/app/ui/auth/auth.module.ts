import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { SharedModule } from '../../shared/shared.module';
import { DataModule } from '../../../app/data/data.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    CompanyFormComponent,
    EmployeeFormComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DataModule,
  ],
})
export class AuthModule {}
