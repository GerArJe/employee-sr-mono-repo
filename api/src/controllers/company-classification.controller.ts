import { Request, Response, NextFunction } from "express";

import { ICompanyClassification } from "../models/company-classification.model";
import CompanyClassificationService from "../services/company-classification.service";
import { errorServerMessage } from "../utils/messages/error-messages";

class CompanyClassificationController {
  async getCompanyClassifications(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const companyClassifications: ICompanyClassification[] =
        await CompanyClassificationService.getCompanyClassifications();

      return res.status(200).json({
        status: true,
        data: companyClassifications,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }
}
export default new CompanyClassificationController();
