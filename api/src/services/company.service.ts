import { FieldValue } from "firebase-admin/firestore";

import { db } from "../database/firebase";
import { ICompany, ICreateCompanyDTO, IUpdateCompanyDTO } from "../models/company.model";

class CompanyService {
  async getCompanies(): Promise<ICompany[]> {
    try {
      const snapshot = await db.collection("companies").get();
      const companies: ICompany[] = [];
      snapshot.forEach((doc) => {
        companies.push({
          id: doc.id,
          accountId: doc.data().accountId,
          name: doc.data().name,
          nit: doc.data().nit,
          cellphone: doc.data().cellphone,
          employeesNumber: doc.data().employeesNumber,
          creationDate: doc.data().creationDate,
          classificationId: doc.data().classificationId,
          web: doc.data().web,
        });
      });
      return companies;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createCompany(
    company: ICreateCompanyDTO
  ): Promise<ICompany> {
    try {
      const snapshot = await db.collection("companies").add({
        timestamp: FieldValue.serverTimestamp(),
        ...company,
      });
      const createdCertification: ICompany = {
        id: snapshot.id,
        ...company,
      };
      return createdCertification;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCompany(
    companyId: string,
    company: IUpdateCompanyDTO
  ): Promise<ICompany> {
    try {
      await db.collection("companies").doc(companyId).update({
        ...company,
        timestamp: FieldValue.serverTimestamp(),
      });
      return await this.getCompanyById(companyId);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCompanyById(companyId: string): Promise<ICompany> {
    try {
      const snapshot = await db
        .collection("companies")
        .doc(companyId)
        .get();
      const company: ICompany = {
        id: snapshot.id,
        ...(snapshot.data() as ICompany),
      };
      return company;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteCompany(companyId: string): Promise<boolean> {
    try {
      await db.collection("companies").doc(companyId).delete();
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default new CompanyService();
