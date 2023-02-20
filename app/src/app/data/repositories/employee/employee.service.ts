import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap, timeout } from 'rxjs';

import {
  IEmployee,
  ICreateEmployeeDTO,
  IUpdateEmployeeDTO,
} from '../../../core/models/employee.model';
import { EmployeeGateway } from '../../../core/gateways/employee.gateway';
import { environment } from '../../../../environments/environment';
import { IEmployeeRS } from './models/employee-rs.model';
import { TIMEOUT_SERVICES } from '../../../core/constants/number.constant';
import { IStatus } from '../../../shared/models/status-rs.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService extends EmployeeGateway {
  employeeUrl: string = `${environment.domainURL}/employees`;

  constructor(private http: HttpClient) {
    super();
  }

  getEmployeeById(employeeId: string): Observable<IEmployee> {
    return this.http.get<IEmployeeRS>(`${this.employeeUrl}/${employeeId}`).pipe(
      timeout(TIMEOUT_SERVICES),
      switchMap((response: IEmployeeRS) => of(response.data))
    );
  }

  createEmployee(employee: ICreateEmployeeDTO): Observable<IEmployee> {
    return this.http.post<IEmployeeRS>(`${this.employeeUrl}`, employee).pipe(
      timeout(TIMEOUT_SERVICES),
      switchMap((response: IEmployeeRS) => of(response.data))
    );
  }

  updateEmployee(
    employee: IUpdateEmployeeDTO,
    employeeId: string
  ): Observable<IEmployee> {
    return this.http
      .put<IEmployeeRS>(`${this.employeeUrl}/${employeeId}`, employee)
      .pipe(
        timeout(TIMEOUT_SERVICES),
        switchMap((response: IEmployeeRS) => of(response.data))
      );
  }

  deleteEmployee(employeeId: string): Observable<IStatus> {
    return this.http
      .delete<IStatus>(`${this.employeeUrl}/${employeeId}`)
      .pipe(timeout(TIMEOUT_SERVICES));
  }
}
