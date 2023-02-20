import { Observable } from 'rxjs';

import { IStatus } from '../../shared/models/status-rs.model';
import {
  ICreateEmployeeDTO,
  IEmployee,
  IUpdateEmployeeDTO,
} from '../models/employee.model';

export abstract class EmployeeGateway {
  abstract getEmployeeById(employeeId: string): Observable<IEmployee>;
  abstract createEmployee(employee: ICreateEmployeeDTO): Observable<IEmployee>;
  abstract updateEmployee(
    employee: IUpdateEmployeeDTO,
    employeeId: string
  ): Observable<IEmployee>;
  abstract deleteEmployee(employeeId: string): Observable<IStatus>;
}
