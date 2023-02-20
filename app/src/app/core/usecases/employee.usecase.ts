import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EmployeeGateway } from '../gateways/employee.gateway';
import {
  ICreateEmployeeDTO,
  IEmployee,
  IUpdateEmployeeDTO,
} from '../models/employee.model';
import { IStatus } from '../../shared/models/status-rs.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeUseCase {
  constructor(private _employeeGateway: EmployeeGateway) {}

  createEmployee(employee: ICreateEmployeeDTO): Observable<IEmployee> {
    return this._employeeGateway.createEmployee(employee);
  }

  updateEmployee(
    employee: IUpdateEmployeeDTO,
    employeeId: string
  ): Observable<IEmployee> {
    return this._employeeGateway.updateEmployee(employee, employeeId);
  }

  deleteEmployee(employeeId: string): Observable<IStatus> {
    return this._employeeGateway.deleteEmployee(employeeId);
  }

  getEmployeeById(employeeId: string): Observable<IEmployee> {
    return this._employeeGateway.getEmployeeById(employeeId);
  }
}
