import { ICompanyClassification } from '../../../../core/models/company-classification.model';

export interface ICompanyClassificationRS {
  status: boolean;
  data: ICompanyClassification[];
}
