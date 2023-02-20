import { IEducation } from '../../../../core/models/education.model';

export interface IEducationByEmployeeRS {
  status: boolean;
  data: IEducation[];
}
