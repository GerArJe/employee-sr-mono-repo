import { Injectable } from '@angular/core';
import { Observable, of, switchMap, timeout } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { CompanyClassificationGateway } from '../../../core/gateways/company-classification.gateway';
import { environment } from '../../../../environments/environment';
import { ICompanyClassification } from '../../../core/models/company-classification.model';
import { ICompanyClassificationRS } from './models/company-classification-rs.model';
import { TIMEOUT_SERVICES } from '../../../core/constants/number.constant';

@Injectable({
  providedIn: 'root',
})
export class CompanyClassificationService extends CompanyClassificationGateway {
  companyClassificationUrl: string = `${environment.domainURL}/company-classifications`;

  constructor(private http: HttpClient) {
    super();
  }

  getCompanyClassifications(): Observable<ICompanyClassification[]> {
    return this.http
      .get<ICompanyClassificationRS>(`${this.companyClassificationUrl}`)
      .pipe(
        timeout(TIMEOUT_SERVICES),
        switchMap((response: ICompanyClassificationRS) => of(response.data))
      );
  }
}
