import { Request, Response, NextFunction } from "express";
import { PythonShell } from "python-shell";
import ObjectsToCsv from "objects-to-csv";

import { IRating } from "../models/rating.model";
import RatingService from "../services/rating.service";
import EmployeeService from "../services/employee.service";
import { IEmployee } from "../models/employee.model";
import { errorServerMessage } from "../utils/messages/error-messages";

class RatingController {
  async saveRatingsToCSV(req: Request, res: Response, next: NextFunction) {
    try {
      const ratings: IRating[] = await RatingService.getRatings();
      const csv = new ObjectsToCsv(ratings);
      await csv.toDisk("src/assets/data/ratings.csv");
      return res.status(200).json({
        status: true,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }

  getRecommendations(req: Request, res: Response, next: NextFunction) {
    const options = {
      args: [
        req.body.companyId,
        req.query.page.toString(),
        req.query.offset.toString(),
      ],
    };
    PythonShell.run(
      "src/utils/scripts/recommendation.py",
      options,
      async function (error, results) {
        if (error) {
          return errorServerMessage(res);
        }
        try {
          // results is an array consisting of messages collected during execution
          const recommendedEmployeesIds: string[] = JSON.parse(results[0]);
          const recommendedEmployeesRatingAverage: number[] = JSON.parse(results[1]);
          const ratings: IEmployee[] =
            await EmployeeService.getRecommendedEmployees(
              recommendedEmployeesIds
            );
          ratings.forEach(rating => {
            rating.rating = recommendedEmployeesRatingAverage[recommendedEmployeesIds.findIndex(employeeId => employeeId === rating.id)]
          });
          return res.status(200).json({
            status: true,
            data: ratings,
          });
        } catch (error) {
          return errorServerMessage(res);
        }
      }
    );
  }

  async createRating(req: Request, res: Response, next: NextFunction) {
    try {
      const rating: IRating = await RatingService.createRating(req.body);
      return res.status(200).json({
        status: true,
        data: rating,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }
}
export default new RatingController();
