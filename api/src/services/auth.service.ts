import { db } from "../database/firebase";
import { IUser } from "../models/user.model";
import { UserType } from "../utils/enums/user-type.enum";

class AuthService {
  async getUser(accountId: string): Promise<IUser> {
    try {
      const company = await db
        .collection("companies")
        .where("accountId", "==", accountId)
        .get();
      const employee = await db
        .collection("employees")
        .where("accountId", "==", accountId)
        .get();
      if (!company.docs[0]?.id && !employee.docs[0]?.id) {
        throw new Error("error");
      }
      const user: IUser = {
        id: company.docs[0]?.id || employee.docs[0]?.id,
        accountId:
          company.docs[0]?.data()?.accountId ||
          employee.docs[0]?.data()?.accountId,
        userType: company.docs[0]?.data()?.accountId
          ? UserType.COMPANY
          : UserType.EMPLOYEE,
      };
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default new AuthService();
