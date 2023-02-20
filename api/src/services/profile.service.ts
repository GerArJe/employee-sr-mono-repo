import { db } from "../database/firebase";
import { IProfile } from "../models/profile.model";

class ProfileService {
  async getProfiles(): Promise<IProfile[]> {
    try {
      const snapshot = await db.collection("profiles").get();
      const profiles: IProfile[] = [];
      snapshot.forEach((doc) => {
        profiles.push({
          id: doc.id,
          name: doc.data().name,
        });
      });
      return profiles;
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default new ProfileService();
