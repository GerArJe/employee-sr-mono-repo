import { ICity } from './city.model';
import { IProfile } from './profile.model';

export interface IFilters {
  profile: IProfile;
  city: ICity;
}
