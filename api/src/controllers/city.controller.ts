import { Request, Response, NextFunction } from "express";

import { ICity } from "../models/city.model";
import CityService from "../services/city.service";
import { errorServerMessage } from "../utils/messages/error-messages";

class CityController {
  async getCities(req: Request, res: Response, next: NextFunction) {
    try {
      const cities: ICity[] = await CityService.getCities();
      return res.status(200).json({
        status: true,
        data: cities,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }
}
export default new CityController();
