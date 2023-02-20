import { check } from "express-validator";
import { Application } from "express";

import { RouteConfig } from "../models/route-config.model";
import RatingController from "../controllers/rating.controller";
import { validateFields } from "../middlewares/validate-fields";
import { errorNumeric, errorRequired } from "../utils/messages/error-messages";
import { validateJWT } from "../middlewares/validate-jwt";

export class RatingRoutes extends RouteConfig {
  constructor(app: Application) {
    super(app, "RatingRoutes");
  }
  configureRoutes() {
    this.app
      .route(`/ratings/recommendations`)
      .post([
        check("companyId", errorRequired("companyId")).not().isEmpty(),
        validateFields,
        validateJWT,
        RatingController.getRecommendations,
      ]);
    this.app
      .route(`/ratings/save-ratings-csv`)
      .get([RatingController.saveRatingsToCSV]);
    this.app
      .route(`/ratings`)
      .post([
        check("companyId", errorRequired("companyId")).not().isEmpty(),
        check("employeeId", errorRequired("employeeId")).not().isEmpty(),
        check("rating", errorRequired("rating")).not().isEmpty(),
        check("rating", errorNumeric("rating")).isNumeric(),
        check("creationDate", errorRequired("creationDate")).not().isEmpty(),
        validateFields,
        validateJWT,
        RatingController.createRating,
      ]);
    return this.app;
  }
}
