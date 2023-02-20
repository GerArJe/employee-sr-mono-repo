import { IEmployee } from '../../../../core/models/employee.model';

export interface IEmployeeRS {
  status: boolean;
  data: IEmployee;
}
