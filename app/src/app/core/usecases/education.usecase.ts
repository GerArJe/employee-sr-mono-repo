import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IStatus } from '../../shared/models/status-rs.model';
import { EducationGateway } from '../gateways/education.gateway';
import {
  IEducation,
  ICreateEducationDTO,
  IUpdateEducationDTO,
} from '../models/education.model';

@Injectable({
  providedIn: 'root',
})
export class EducationUseCase {
  constructor(private _educationGateway: EducationGateway) {}

  createEducation(education: ICreateEducationDTO): Observable<IEducation> {
    return this._educationGateway.createEducation(education);
  }

  getEducationsByEmployee(employeeId: string): Observable<IEducation[]> {
    return this._educationGateway.getEducationsByEmployee(employeeId);
  }

  updateEducation(
    educationId: string,
    education: IUpdateEducationDTO
  ): Observable<IEducation> {
    return this._educationGateway.updateEducation(educationId, education);
  }

  deleteEducation(educationId: string): Observable<IStatus> {
    return this._educationGateway.deleteEducation(educationId);
  }
}
