import { Request, Response, NextFunction } from "express";

import { IExperience } from "../models/experience.model";
import ExperienceService from "../services/experience.service";
import { errorServerMessage } from "../utils/messages/error-messages";

class ExperienceController {
  async getExperiences(req: Request, res: Response, next: NextFunction) {
    try {
      const experiences: IExperience[] =
        await ExperienceService.getExperiences();
      return res.status(200).json({
        status: true,
        data: experiences,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }

  async getExperienceByEmployee(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const experience: IExperience[] =
        await ExperienceService.getExperienceByEmployee(req.params.employeeId);
      return res.status(200).json({
        status: true,
        data: experience,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }

  async createExperience(req: Request, res: Response, next: NextFunction) {
    try {
      const experience: IExperience = await ExperienceService.createExperience(
        req.body
      );
      return res.status(200).json({
        status: true,
        data: experience,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }

  async updateExperience(req: Request, res: Response, next: NextFunction) {
    try {
      const experience: IExperience = await ExperienceService.updateExperience(
        req.params.experienceId,
        req.body
      );
      return res.status(200).json({
        status: true,
        data: experience,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }

  async deleteExperience(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted: boolean = await ExperienceService.deleteExperience(
        req.params.experienceId,
      );
      return res.status(200).json({
        status: deleted,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }
}
export default new ExperienceController();
