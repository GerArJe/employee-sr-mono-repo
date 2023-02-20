import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CompanyClassificationGateway } from '../gateways/company-classification.gateway';
import { ICompanyClassification } from '../models/company-classification.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyClassificationUseCase {
  constructor(
    private _companyClassificationGateway: CompanyClassificationGateway
  ) {}

  getCompanyClassifications(): Observable<ICompanyClassification[]> {
    return this._companyClassificationGateway.getCompanyClassifications();
  }
}
