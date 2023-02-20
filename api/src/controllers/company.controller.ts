import { Request, Response, NextFunction } from "express";

import { ICompany } from "../models/company.model";
import CompanyService from "../services/company.service";
import { errorServerMessage } from "../utils/messages/error-messages";

class CompanyController {
  async getCompanies(req: Request, res: Response, next: NextFunction) {
    try {
      const companies: ICompany[] = await CompanyService.getCompanies();
      return res.status(200).json({
        status: true,
        data: companies,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }

  async createCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const company: ICompany = await CompanyService.createCompany(req.body);
      return res.status(200).json({
        status: true,
        data: company,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }

  async updateCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const company: ICompany = await CompanyService.updateCompany(
        req.params.companyId,
        req.body
      );
      return res.status(200).json({
        status: true,
        data: company,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }

  async deleteCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted: boolean = await CompanyService.deleteCompany(
        req.params.companyId
      );
      return res.status(200).json({
        status: deleted,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }

  async getCompanyById(req: Request, res: Response, next: NextFunction) {
    try {
      const company: ICompany = await CompanyService.getCompanyById(
        req.params.companyId
      );
      return res.status(200).json({
        status: true,
        data: company,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }
}
export default new CompanyController();
