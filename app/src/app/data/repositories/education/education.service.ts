import { Injectable } from '@angular/core';
import { Observable, of, switchMap, timeout } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { IStatus } from '../../../shared/models/status-rs.model';
import {
  ICreateEducationDTO,
  IEducation,
  IUpdateEducationDTO,
} from '../../../core/models/education.model';
import { environment } from '../../../../environments/environment';
import { EducationGateway } from '../../../core/gateways/education.gateway';
import { IEducationRS } from './models/education-rs.model';
import { TIMEOUT_SERVICES } from '../../../core/constants/number.constant';
import { IEducationByEmployeeRS } from './models/education-by-employee-rs.model';

@Injectable({
  providedIn: 'root',
})
export class EducationService extends EducationGateway {
  educationUrl: string = `${environment.domainURL}/education`;

  constructor(private http: HttpClient) {
    super();
  }

  createEducation(education: ICreateEducationDTO): Observable<IEducation> {
    return this.http.post<IEducationRS>(`${this.educationUrl}`, education).pipe(
      timeout(TIMEOUT_SERVICES),
      switchMap((response: IEducationRS) => of(response.data))
    );
  }

  getEducationsByEmployee(employeeId: string): Observable<IEducation[]> {
    return this.http
      .get<IEducationByEmployeeRS>(
        `${this.educationUrl}/employee/${employeeId}`
      )
      .pipe(
        timeout(TIMEOUT_SERVICES),
        switchMap((response: IEducationByEmployeeRS) => of(response.data))
      );
  }

  updateEducation(
    educationId: string,
    education: IUpdateEducationDTO
  ): Observable<IEducation> {
    return this.http
      .put<IEducationRS>(`${this.educationUrl}/${educationId}`, education)
      .pipe(
        timeout(TIMEOUT_SERVICES),
        switchMap((response: IEducationRS) => of(response.data))
      );
  }

  deleteEducation(educationId: string): Observable<IStatus> {
    return this.http
      .delete<IStatus>(`${this.educationUrl}/${educationId}`)
      .pipe(timeout(TIMEOUT_SERVICES));
  }
}
