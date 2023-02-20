import { Observable } from 'rxjs';

import {
  ICertification,
  ICreateCertificationDTO,
  IUpdateCertificationDTO,
} from '../models/certification.model';
import { IStatus } from '../../shared/models/status-rs.model';

export abstract class CertificationGateway {
  abstract createCertification(
    certification: ICreateCertificationDTO
  ): Observable<ICertification>;

  abstract getCertificationsByEmployee(
    employeeId: string
  ): Observable<ICertification[]>;

  abstract updateCertification(
    certificationId: string,
    certification: IUpdateCertificationDTO
  ): Observable<ICertification>;

  abstract deleteCertification(certificationId: string): Observable<IStatus>;
}
