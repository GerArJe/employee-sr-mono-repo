import { UserType } from "../utils/enums/user-type.enum";

export interface IUser {
  id: string;
  accountId: string;
  userType: UserType
}
