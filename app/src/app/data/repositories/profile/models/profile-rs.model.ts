import { IProfile } from '../../../../core/models/profile.model';

export interface IProfileRS {
  status: boolean;
  data: IProfile[];
}
