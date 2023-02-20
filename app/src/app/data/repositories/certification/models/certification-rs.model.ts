import { ICertification } from '../../../../core/models/certification.model';

export interface ICertificationRS {
  status: boolean;
  data: ICertification;
}
