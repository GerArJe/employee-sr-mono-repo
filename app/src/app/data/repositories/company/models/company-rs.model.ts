import { ICompany } from '../../../../core/models/company.model';

export interface ICompanyRS {
  status: boolean;
  data: ICompany;
}
