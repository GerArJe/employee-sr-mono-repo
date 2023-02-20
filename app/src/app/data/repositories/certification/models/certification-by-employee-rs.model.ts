import { ICertification } from '../../../../core/models/certification.model';

export interface ICertificationByEmployeeRS {
  status: boolean;
  data: ICertification[];
}
