import { ICity } from '../../../../core/models/city.model';

export interface ICityRS {
  status: boolean;
  data: ICity[];
}
