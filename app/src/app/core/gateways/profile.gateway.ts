import { Observable } from 'rxjs';

import { IProfile } from '../models/profile.model';

export abstract class ProfileGateway {
  abstract getProfiles(): Observable<IProfile[]>;
}
