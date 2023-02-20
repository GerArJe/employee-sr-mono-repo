import { UserType } from '../../../../core/enums/user-type.enum';

export interface IGetTokenRS {
  status: boolean;
  token: string;
  user: {
    id: string;
    accountId: string;
    userType: UserType;
  };
}
