import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IStatus } from '../../shared/models/status-rs.model';
import { ExperienceGateway } from '../gateways/experience.gateway';
import {
  IExperience,
  ICreateExperienceDTO,
  IUpdateExperienceDTO,
} from '../models/experience.model';

@Injectable({
  providedIn: 'root',
})
export class ExperienceUseCase {
  constructor(private _experienceGateway: ExperienceGateway) {}

  createExperience(experience: ICreateExperienceDTO): Observable<IExperience> {
    return this._experienceGateway.createExperience(experience);
  }

  getExperiencesByEmployee(employeeId: string): Observable<IExperience[]> {
    return this._experienceGateway.getExperiencesByEmployee(employeeId);
  }

  updateExperience(
    experienceId: string,
    experience: IUpdateExperienceDTO
  ): Observable<IExperience> {
    return this._experienceGateway.updateExperience(experienceId, experience);
  }

  deleteExperience(experienceId: string): Observable<IStatus> {
    return this._experienceGateway.deleteExperience(experienceId);
  }
}
