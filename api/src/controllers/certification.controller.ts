import { Request, Response, NextFunction } from "express";

import { ICertification } from "../models/certification.model";
import CertificationService from "../services/certification.service";
import { errorServerMessage } from "../utils/messages/error-messages";

class CertificationController {
  async getCertifications(req: Request, res: Response, next: NextFunction) {
    try {
      const certifications: ICertification[] =
        await CertificationService.getCertifications();
      return res.status(200).json({
        status: true,
        data: certifications,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }

  async createCertification(req: Request, res: Response, next: NextFunction) {
    try {
      const certification: ICertification =
        await CertificationService.createCertification(req.body);
      return res.status(200).json({
        status: true,
        data: certification,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }

  async getCertificationsByEmployee(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const certifications: ICertification[] =
        await CertificationService.getCertificationsByEmployee(
          req.params.employeeId
        );
      return res.status(200).json({
        status: true,
        data: certifications,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }

  async updateCertification(req: Request, res: Response, next: NextFunction) {
    try {
      const certification: ICertification =
        await CertificationService.updateCertification(
          req.params.certificationId,
          req.body
        );
      return res.status(200).json({
        status: true,
        data: certification,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }

  async deleteCertification(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted: boolean =
        await CertificationService.deleteCertification(
          req.params.certificationId,
        );
      return res.status(200).json({
        status: deleted,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }
}
export default new CertificationController();
