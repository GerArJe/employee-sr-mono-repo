import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IStatus } from '../../shared/models/status-rs.model';
import { CertificationGateway } from '../gateways/certification.gateway';
import {
  ICertification,
  ICreateCertificationDTO,
  IUpdateCertificationDTO,
} from '../models/certification.model';

@Injectable({
  providedIn: 'root',
})
export class CertificationUseCase {
  constructor(private _certificationGateway: CertificationGateway) {}

  createCertification(
    certification: ICreateCertificationDTO
  ): Observable<ICertification> {
    return this._certificationGateway.createCertification(certification);
  }

  getCertificationsByEmployee(
    employeeId: string
  ): Observable<ICertification[]> {
    return this._certificationGateway.getCertificationsByEmployee(employeeId);
  }

  updateCertification(
    certificationId: string,
    certification: IUpdateCertificationDTO
  ): Observable<ICertification> {
    return this._certificationGateway.updateCertification(
      certificationId,
      certification
    );
  }

  deleteCertification(certificationId: string): Observable<IStatus> {
    return this._certificationGateway.deleteCertification(certificationId);
  }
}
