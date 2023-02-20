import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap, timeout } from 'rxjs';

import { CompanyGateway } from '../../../core/gateways/company.gateway';
import { environment } from '../../../../environments/environment';
import {
  ICompany,
  ICreateCompanyDTO,
  IUpdateCompanyDTO,
} from '../../../core/models/company.model';
import { ICompanyRS } from './models/company-rs.model';
import { TIMEOUT_SERVICES } from '../../../core/constants/number.constant';
import { IStatus } from '../../../shared/models/status-rs.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService extends CompanyGateway {
  companyUrl: string = `${environment.domainURL}/companies`;

  constructor(private http: HttpClient) {
    super();
  }

  createCompany(company: ICreateCompanyDTO): Observable<ICompany> {
    return this.http.post<ICompanyRS>(`${this.companyUrl}`, company).pipe(
      timeout(TIMEOUT_SERVICES),
      switchMap((response: ICompanyRS) => of(response.data))
    );
  }

  updateCompany(
    company: IUpdateCompanyDTO,
    companyId: string
  ): Observable<ICompany> {
    return this.http
      .put<ICompanyRS>(`${this.companyUrl}/${companyId}`, company)
      .pipe(
        timeout(TIMEOUT_SERVICES),
        switchMap((response: ICompanyRS) => of(response.data))
      );
  }

  deleteCompany(companyId: string): Observable<IStatus> {
    return this.http
      .delete<IStatus>(`${this.companyUrl}/${companyId}`)
      .pipe(timeout(TIMEOUT_SERVICES));
  }

  getCompanyById(companyId: string): Observable<ICompany> {
    return this.http.get<ICompanyRS>(`${this.companyUrl}/${companyId}`).pipe(
      timeout(TIMEOUT_SERVICES),
      switchMap((response: ICompanyRS) => of(response.data))
    );
  }
}
