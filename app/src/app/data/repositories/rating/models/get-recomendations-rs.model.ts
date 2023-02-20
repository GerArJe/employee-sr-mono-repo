import { IEmployee } from '../../../../core/models/employee.model';

export interface IGetRecommendationsRS {
  status: boolean;
  data: IEmployee[];
}
