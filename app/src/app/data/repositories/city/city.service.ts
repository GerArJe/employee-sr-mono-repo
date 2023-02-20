import { Injectable } from '@angular/core';
import { Observable, of, switchMap, timeout } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { CityGateway } from '../../../core/gateways/city.gateway';
import { ICity } from '../../../core/models/city.model';
import { TIMEOUT_SERVICES } from '../../../core/constants/number.constant';
import { ICityRS } from './models/city-rs.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CityService extends CityGateway {
  cityUrl: string = `${environment.domainURL}/cities`;
  citiesBackup: ICity[] = [];

  constructor(private http: HttpClient) {
    super();
  }

  getCities(): Observable<ICity[]> {
    if (this.citiesBackup.length > 0) {
      return of(JSON.parse(JSON.stringify(this.citiesBackup)));
    } else {
      return this.http.get<ICityRS>(`${this.cityUrl}`).pipe(
        timeout(TIMEOUT_SERVICES),
        switchMap((response: ICityRS) => {
          this.citiesBackup = JSON.parse(JSON.stringify(response.data));
          return of(response.data);
        })
      );
    }
  }
}
