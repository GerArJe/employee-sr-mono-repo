import { IExperience } from '../../../../core/models/experience.model';

export interface IExperienceByEmployeeRS {
  status: boolean;
  data: IExperience[];
}
