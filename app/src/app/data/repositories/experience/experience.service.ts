import { Injectable } from '@angular/core';
import { Observable, of, switchMap, timeout } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { IStatus } from '../../../shared/models/status-rs.model';
import {
  ICreateExperienceDTO,
  IExperience,
  IUpdateExperienceDTO,
} from '../../../core/models/experience.model';
import { environment } from '../../../../environments/environment';
import { ExperienceGateway } from '../../../core/gateways/experience.gateway';
import { IExperienceRS } from './models/experience-rs.model';
import { TIMEOUT_SERVICES } from '../../../core/constants/number.constant';
import { IExperienceByEmployeeRS } from './models/experience-by-employee-rs.model';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService extends ExperienceGateway {
  experienceUrl: string = `${environment.domainURL}/experiences`;

  constructor(private http: HttpClient) {
    super();
  }

  createExperience(experience: ICreateExperienceDTO): Observable<IExperience> {
    return this.http
      .post<IExperienceRS>(`${this.experienceUrl}`, experience)
      .pipe(
        timeout(TIMEOUT_SERVICES),
        switchMap((response: IExperienceRS) => of(response.data))
      );
  }

  getExperiencesByEmployee(employeeId: string): Observable<IExperience[]> {
    return this.http
      .get<IExperienceByEmployeeRS>(
        `${this.experienceUrl}/employee/${employeeId}`
      )
      .pipe(
        timeout(TIMEOUT_SERVICES),
        switchMap((response: IExperienceByEmployeeRS) => of(response.data))
      );
  }

  updateExperience(
    experienceId: string,
    experience: IUpdateExperienceDTO
  ): Observable<IExperience> {
    return this.http
      .put<IExperienceRS>(`${this.experienceUrl}/${experienceId}`, experience)
      .pipe(
        timeout(TIMEOUT_SERVICES),
        switchMap((response: IExperienceRS) => of(response.data))
      );
  }

  deleteExperience(experienceId: string): Observable<IStatus> {
    return this.http
      .delete<IStatus>(`${this.experienceUrl}/${experienceId}`)
      .pipe(timeout(TIMEOUT_SERVICES));
  }
}
