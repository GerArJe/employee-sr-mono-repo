import { FieldValue } from "firebase-admin/firestore";
import { db } from "../database/firebase";
import {
  ICreateExperienceDTO,
  IExperience,
  IUpdateExperienceDTO,
} from "../models/experience.model";

class ExperienceService {
  async getExperiences(): Promise<IExperience[]> {
    try {
      const snapshot = await db.collection("experiences").get();
      const experiences: IExperience[] = [];
      snapshot.forEach((doc) => {
        experiences.push({
          id: doc.id,
          employeeId: doc.data().name,
          title: doc.data().title,
          companyName: doc.data().companyName,
          startDate: doc.data().startDate,
          endDate: doc.data().endDate,
          description: doc.data().description,
        });
      });
      return experiences;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getExperienceByEmployee(employeeId: string): Promise<IExperience[]> {
    try {
      const snapshot = await db
        .collection("experiences")
        .where("employeeId", "==", employeeId)
        .get();
      const experiences: IExperience[] = [];
      snapshot.forEach((doc) => {
        experiences.push({
          id: doc.id,
          employeeId: doc.data().name,
          title: doc.data().title,
          companyName: doc.data().companyName,
          startDate: doc.data().startDate,
          endDate: doc.data().endDate,
          description: doc.data().description,
        });
      });
      return experiences;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createExperience(
    experience: ICreateExperienceDTO
  ): Promise<IExperience> {
    try {
      const snapshot = await db.collection("experiences").add({
        timestamp: FieldValue.serverTimestamp(),
        ...experience,
      });
      const createdExperience: IExperience = {
        id: snapshot.id,
        ...experience,
      };
      return createdExperience;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateExperience(
    experienceId: string,
    experience: IUpdateExperienceDTO
  ): Promise<IExperience> {
    try {
      await db.collection("experiences").doc(experienceId).update({
        ...experience,
        timestamp: FieldValue.serverTimestamp(),
      });
      return await this.getExperienceById(experienceId);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getExperienceById(experienceId: string): Promise<IExperience> {
    try {
      const snapshot = await db
        .collection("experiences")
        .doc(experienceId)
        .get();
      const experience: IExperience = {
        id: snapshot.id,
        ...(snapshot.data() as IExperience),
      };
      return experience;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteExperience(experienceId: string): Promise<boolean> {
    try {
      await db.collection("experiences").doc(experienceId).delete();
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default new ExperienceService();
