import { FieldValue } from "firebase-admin/firestore";

import { db } from "../database/firebase";
import {
  ICreateEducationDTO,
  IEducation,
  IUpdateEducationDTO,
} from "../models/education.model";

class EducationService {
  async getEducation(): Promise<IEducation[]> {
    try {
      const snapshot = await db.collection("education").get();
      const education: IEducation[] = [];
      snapshot.forEach((doc) => {
        education.push({
          id: doc.id,
          employeeId: doc.data().employeeId,
          school: doc.data().school,
          degree: doc.data().degree,
          startDate: doc.data().startDate,
          endDate: doc.data().endDate,
        });
      });
      return education;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getEducationByEmployee(employeeId: string): Promise<IEducation[]> {
    try {
      const snapshot = await db
        .collection("education")
        .where("employeeId", "==", employeeId)
        .get();
      const education: IEducation[] = [];
      snapshot.forEach((doc) => {
        education.push({
          id: doc.id,
          employeeId: doc.data().employeeId,
          school: doc.data().school,
          degree: doc.data().degree,
          startDate: doc.data().startDate,
          endDate: doc.data().endDate,
        });
      });
      return education;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createEducation(education: ICreateEducationDTO): Promise<IEducation> {
    try {
      const snapshot = await db.collection("education").add({
        timestamp: FieldValue.serverTimestamp(),
        ...education,
      });
      const createdCertification: IEducation = {
        id: snapshot.id,
        ...education,
      };
      return createdCertification;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateEducation(
    educationId: string,
    education: IUpdateEducationDTO
  ): Promise<IEducation> {
    try {
      await db.collection("education").doc(educationId).update({
        ...education,
        timestamp: FieldValue.serverTimestamp(),
      });
      return await this.getEducationById(educationId);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getEducationById(educationId: string): Promise<IEducation> {
    try {
      const snapshot = await db.collection("education").doc(educationId).get();
      const education: IEducation = {
        id: snapshot.id,
        ...(snapshot.data() as IEducation),
      };
      return education;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteEducation(educationId: string): Promise<boolean> {
    try {
      await db.collection("education").doc(educationId).delete();
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default new EducationService();
