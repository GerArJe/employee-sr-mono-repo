import { FieldValue, Timestamp } from "firebase-admin/firestore";

import { db } from "../database/firebase";
import { ICreateRatingDTO, IRating } from "../models/rating.model";

class RatingService {
  async getRatings(): Promise<IRating[]> {
    try {
      const snapshot = await db.collection("ratings").get();
      const ratings: IRating[] = [];
      snapshot.forEach((doc) => {
        ratings.push({
          id: doc.id,
          employeeId: doc.data().employeeId,
          companyId: doc.data().companyId,
          rating: doc.data().rating,
          creationDate: doc.data().creationDate,
        });
      });
      return ratings;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createRating(rating: ICreateRatingDTO): Promise<IRating> {
    try {
      const snapshot = await db.collection("ratings").add({
        rating,
        creationDate: FieldValue.serverTimestamp(),
      })
      return await this.getRatingById(snapshot.id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getRatingById(ratingId: string): Promise<IRating>{
    try {
      const snapshot = await db.collection("ratings").doc(ratingId).get();
      const createdRating: IRating = {
        id: snapshot.id,
        companyId: snapshot.data().companyId,
        employeeId: snapshot.data().employeeId,
        rating: snapshot.data().employeeId,
        creationDate: (snapshot.data().creationDate as Timestamp).toDate().toISOString()
      };
      return createdRating;
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default new RatingService();
