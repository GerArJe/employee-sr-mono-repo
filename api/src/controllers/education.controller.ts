import { Request, Response, NextFunction } from "express";

import { IEducation } from "../models/education.model";
import EducationService from "../services/education.service";
import { errorServerMessage } from "../utils/messages/error-messages";

class EducationController {
  async getEducation(req: Request, res: Response, next: NextFunction) {
    try {
      const education: IEducation[] = await EducationService.getEducation();

      return res.status(200).json({
        status: true,
        data: education,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }

  async getEducationByEmployee(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const education: IEducation[] =
        await EducationService.getEducationByEmployee(req.params.employeeId);
      return res.status(200).json({
        status: true,
        data: education,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }

  async createEducation(req: Request, res: Response, next: NextFunction) {
    try {
      const education: IEducation = await EducationService.createEducation(
        req.body
      );
      return res.status(200).json({
        status: true,
        data: education,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }

  async updateEducation(req: Request, res: Response, next: NextFunction) {
    try {
      const education: IEducation = await EducationService.updateEducation(
        req.params.educationId,
        req.body
      );
      return res.status(200).json({
        status: true,
        data: education,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }

  async deleteEducation(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted: boolean = await EducationService.deleteEducation(
        req.params.educationId
      );
      return res.status(200).json({
        status: deleted,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }
}
export default new EducationController();
