import { FieldValue } from "firebase-admin/firestore";

import { db } from "../database/firebase";
import { ICertification, ICreateCertificationDTO, IUpdateCertificationDTO } from "../models/certification.model";

class CertificationService {
  async getCertifications(): Promise<ICertification[]> {
    try {
      const snapshot = await db.collection("certifications").get();
      const certifications: ICertification[] = [];
      snapshot.forEach((doc) => {
        certifications.push({
          id: doc.id,
          employeeId: doc.data().employeeId,
          issueDate: doc.data().issueDate,
          issuingOrganization: doc.data().issueOrganization,
          name: doc.data().name,
        });
      });
      return certifications;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCertificationsByEmployee(
    employeeId: string
  ): Promise<ICertification[]> {
    try {
      const snapshot = await db
        .collection("certifications")
        .where("employeeId", "==", employeeId)
        .get();
      const certifications: ICertification[] = [];
      snapshot.forEach((doc) => {
        certifications.push({
          id: doc.id,
          employeeId: doc.data().employeeId,
          issueDate: doc.data().issueDate,
          issuingOrganization: doc.data().issuingOrganization,
          name: doc.data().name,
        });
      });
      return certifications;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createCertification(
    certification: ICreateCertificationDTO
  ): Promise<ICertification> {
    try {
      const snapshot = await db.collection("certifications").add({
        timestamp: FieldValue.serverTimestamp(),
        ...certification,
      });
      const createdCertification: ICertification = {
        id: snapshot.id,
        ...certification,
      };
      return createdCertification;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCertification(
    certificationId: string,
    certification: IUpdateCertificationDTO
  ): Promise<ICertification> {
    try {
      await db.collection("certifications").doc(certificationId).update({
        ...certification,
        timestamp: FieldValue.serverTimestamp(),
      });
      return await this.getCertificationById(certificationId);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCertificationById(certificationId: string): Promise<ICertification> {
    try {
      const snapshot = await db
        .collection("certifications")
        .doc(certificationId)
        .get();
      const certification: ICertification = {
        id: snapshot.id,
        ...(snapshot.data() as ICertification),
      };
      return certification;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteCertification(certificationId: string): Promise<boolean> {
    try {
      await db.collection("certifications").doc(certificationId).delete();
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default new CertificationService();
