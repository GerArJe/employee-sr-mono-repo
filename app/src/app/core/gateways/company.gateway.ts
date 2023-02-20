import { Observable } from 'rxjs';

import { IStatus } from '../../shared/models/status-rs.model';
import {
  ICompany,
  ICreateCompanyDTO,
  IUpdateCompanyDTO,
} from '../models/company.model';

export abstract class CompanyGateway {
  abstract createCompany(company: ICreateCompanyDTO): Observable<ICompany>;
  abstract updateCompany(
    company: IUpdateCompanyDTO,
    companyId: string
  ): Observable<ICompany>;
  abstract deleteCompany(companyId: string): Observable<IStatus>;
  abstract getCompanyById(companyId: string): Observable<ICompany>;
}
