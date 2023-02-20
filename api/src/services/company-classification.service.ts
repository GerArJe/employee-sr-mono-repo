import { db } from "../database/firebase";
import { ICompanyClassification } from "../models/company-classification.model";

class CompanyClassificationService {
  async getCompanyClassifications(): Promise<ICompanyClassification[]> {
    try {
      const snapshot = await db.collection("company_classification").get();
      const companyClassifications: ICompanyClassification[] = [];
      snapshot.forEach((doc) => {
        companyClassifications.push({
          id: doc.id,
          name: doc.data().name,
        });
      });
      return companyClassifications;
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default new CompanyClassificationService();