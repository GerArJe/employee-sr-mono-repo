import { Observable } from 'rxjs';

import {
  IExperience,
  ICreateExperienceDTO,
  IUpdateExperienceDTO,
} from '../models/experience.model';
import { IStatus } from '../../shared/models/status-rs.model';

export abstract class ExperienceGateway {
  abstract createExperience(
    experience: ICreateExperienceDTO
  ): Observable<IExperience>;

  abstract getExperiencesByEmployee(
    employeeId: string
  ): Observable<IExperience[]>;

  abstract updateExperience(
    experienceId: string,
    experience: IUpdateExperienceDTO
  ): Observable<IExperience>;

  abstract deleteExperience(experienceId: string): Observable<IStatus>;
}
