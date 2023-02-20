import { db } from "../database/firebase";
import { ICity } from "../models/city.model";

class CityService {
  async getCities(): Promise<ICity[]> {
    try {
      const snapshot = await db.collection("cities").get();
      const cities: ICity[] = [];
      snapshot.forEach((doc) => {
        cities.push({
          id: doc.id,
          name: doc.data().name,
        });
      });
      return cities;
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default new CityService();