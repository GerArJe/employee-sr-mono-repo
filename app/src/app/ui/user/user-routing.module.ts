import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './pages/company/company.component';
import { EmployeeComponent } from './pages/employee/employee.component';

import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'company-info',
        component: CompanyComponent,
      },
      {
        path: 'user-info',
        component: EmployeeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
