import { Observable } from 'rxjs';

import {
  IEducation,
  ICreateEducationDTO,
  IUpdateEducationDTO,
} from '../models/education.model';
import { IStatus } from '../../shared/models/status-rs.model';

export abstract class EducationGateway {
  abstract createEducation(
    education: ICreateEducationDTO
  ): Observable<IEducation>;

  abstract getEducationsByEmployee(
    employeeId: string
  ): Observable<IEducation[]>;

  abstract updateEducation(
    educationId: string,
    education: IUpdateEducationDTO
  ): Observable<IEducation>;

  abstract deleteEducation(educationId: string): Observable<IStatus>;
}
