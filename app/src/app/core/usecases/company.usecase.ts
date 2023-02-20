import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CompanyGateway } from '../gateways/company.gateway';
import {
  ICompany,
  ICreateCompanyDTO,
  IUpdateCompanyDTO,
} from '../models/company.model';
import { IStatus } from '../../shared/models/status-rs.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyUseCase {
  constructor(private _companyGateway: CompanyGateway) {}

  createCompany(company: ICreateCompanyDTO): Observable<ICompany> {
    return this._companyGateway.createCompany(company);
  }

  updateCompany(
    company: IUpdateCompanyDTO,
    companyId: string
  ): Observable<ICompany> {
    return this._companyGateway.updateCompany(company, companyId);
  }

  deleteCompany(companyId: string): Observable<IStatus> {
    return this._companyGateway.deleteCompany(companyId);
  }

  getCompanyById(companyId: string): Observable<ICompany> {
    return this._companyGateway.getCompanyById(companyId);
  }
}
