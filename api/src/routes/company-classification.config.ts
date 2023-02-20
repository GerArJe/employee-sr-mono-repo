import { Application } from "express";

import { RouteConfig } from "../models/route-config.model";
import CompanyClassificationController from "../controllers/company-classification.controller";
import { validateJWT } from "../middlewares/validate-jwt";

export class CompanyClassificationRoutes extends RouteConfig {
  constructor(app: Application) {
    super(app, "CompanyClassificationRoutes");
  }
  configureRoutes() {
    this.app
      .route(`/company-classifications`)
      .get([
        validateJWT,
        CompanyClassificationController.getCompanyClassifications,
      ]);
    return this.app;
  }
}
