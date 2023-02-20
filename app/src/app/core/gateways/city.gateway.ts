import { Observable } from 'rxjs';

import { ICity } from '../models/city.model';

export abstract class CityGateway {
  abstract getCities(): Observable<ICity[]>;
}
