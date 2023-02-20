import { Request, Response, NextFunction } from "express";

import { IProfile } from "../models/profile.model";
import ProfileService from "../services/profile.service";
import { errorServerMessage } from "../utils/messages/error-messages";

class ProfileController {
  async getProfiles(req: Request, res: Response, next: NextFunction) {
    try {
      const profile: IProfile[] = await ProfileService.getProfiles();
      return res.status(200).json({
        status: true,
        data: profile,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }
}
export default new ProfileController();
