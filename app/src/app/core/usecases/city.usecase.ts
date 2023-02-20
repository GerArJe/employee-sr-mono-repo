import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CityGateway } from '../gateways/city.gateway';
import { ICity } from '../models/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityUseCase {
  constructor(private _cityGateway: CityGateway) {}

  getCities(): Observable<ICity[]> {
    return this._cityGateway.getCities();
  }
}
