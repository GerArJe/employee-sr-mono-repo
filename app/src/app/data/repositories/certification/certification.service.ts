import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap, timeout } from 'rxjs';

import {
  ICreateCertificationDTO,
  ICertification,
  IUpdateCertificationDTO,
} from '../../../core/models/certification.model';
import { environment } from '../../../../environments/environment';
import { CertificationGateway } from '../../../core/gateways/certification.gateway';
import { ICertificationRS } from './models/certification-rs.model';
import { TIMEOUT_SERVICES } from '../../../core/constants/number.constant';
import { ICertificationByEmployeeRS } from './models/certification-by-employee-rs.model';
import { IStatus } from '../../../shared/models/status-rs.model';

@Injectable({
  providedIn: 'root',
})
export class CertificationService extends CertificationGateway {
  certificationUrl: string = `${environment.domainURL}/certifications`;

  constructor(private http: HttpClient) {
    super();
  }

  createCertification(
    certification: ICreateCertificationDTO
  ): Observable<ICertification> {
    return this.http
      .post<ICertificationRS>(`${this.certificationUrl}`, certification)
      .pipe(
        timeout(TIMEOUT_SERVICES),
        switchMap((response: ICertificationRS) => of(response.data))
      );
  }

  getCertificationsByEmployee(
    employeeId: string
  ): Observable<ICertification[]> {
    return this.http
      .get<ICertificationByEmployeeRS>(
        `${this.certificationUrl}/employee/${employeeId}`
      )
      .pipe(
        timeout(TIMEOUT_SERVICES),
        switchMap((response: ICertificationByEmployeeRS) => of(response.data))
      );
  }

  updateCertification(
    certificationId: string,
    certification: IUpdateCertificationDTO
  ): Observable<ICertification> {
    return this.http
      .put<ICertificationRS>(
        `${this.certificationUrl}/${certificationId}`,
        certification
      )
      .pipe(
        timeout(TIMEOUT_SERVICES),
        switchMap((response: ICertificationRS) => of(response.data))
      );
  }

  deleteCertification(certificationId: string): Observable<IStatus> {
    return this.http
      .delete<IStatus>(`${this.certificationUrl}/${certificationId}`)
      .pipe(timeout(TIMEOUT_SERVICES));
  }
}
