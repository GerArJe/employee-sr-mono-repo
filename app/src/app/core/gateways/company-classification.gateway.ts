import { Observable } from 'rxjs';

import { ICompanyClassification } from '../models/company-classification.model';

export abstract class CompanyClassificationGateway {
  abstract getCompanyClassifications(): Observable<ICompanyClassification[]>;
}
