import { Injectable } from '@angular/core';
import { Observable, of, switchMap, timeout } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ProfileGateway } from '../../../core/gateways/profile.gateway';
import { environment } from '../../../../environments/environment';
import { IProfile } from '../../../core/models/profile.model';
import { IProfileRS } from './models/profile-rs.model';
import { TIMEOUT_SERVICES } from '../../../core/constants/number.constant';

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends ProfileGateway {
  profileUrl: string = `${environment.domainURL}/profiles`;
  profilesBackup: IProfile[] = [];

  constructor(private http: HttpClient) {
    super();
  }

  getProfiles(): Observable<IProfile[]> {
    if (this.profilesBackup.length > 0) {
      return of(JSON.parse(JSON.stringify(this.profilesBackup)));
    } else {
      return this.http.get<IProfileRS>(`${this.profileUrl}`).pipe(
        timeout(TIMEOUT_SERVICES),
        switchMap((response: IProfileRS) => {
          this.profilesBackup = JSON.parse(JSON.stringify(response.data));
          return of(response.data);
        })
      );
    }
  }
}
