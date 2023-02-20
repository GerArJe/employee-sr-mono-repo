import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProfileGateway } from '../gateways/profile.gateway';
import { IProfile } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileUseCase {
  constructor(private _profileGateway: ProfileGateway) {}

  getProfiles(): Observable<IProfile[]> {
    return this._profileGateway.getProfiles();
  }
}
