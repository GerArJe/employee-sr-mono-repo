import { Application } from "express";
import { check } from "express-validator";

import { RouteConfig } from "../models/route-config.model";
import EducationController from "../controllers/education.controller";
import { validateJWT } from "../middlewares/validate-jwt";
import { validateFields } from "../middlewares/validate-fields";
import { errorRequired } from "../utils/messages/error-messages";

export class EducationRoutes extends RouteConfig {
  constructor(app: Application) {
    super(app, "EducationRoutes");
  }
  configureRoutes() {
    this.app
      .route(`/education`)
      .get([validateJWT, EducationController.getEducation]);
    this.app
      .route(`/education/employee/:employeeId`)
      .get([validateJWT, EducationController.getEducationByEmployee]);
    this.app
      .route(`/education`)
      .post([
        check("employeeId", errorRequired("employeeId")).not().isEmpty(),
        check("school", errorRequired("school")).not().isEmpty(),
        check("degree", errorRequired("degree")).not().isEmpty(),
        check("startDate", errorRequired("startDate")).not().isEmpty(),
        validateFields,
        validateJWT,
        EducationController.createEducation,
      ]);
    this.app
      .route(`/education/:educationId`)
      .put([
        check("employeeId", errorRequired("employeeId")).not().isEmpty(),
        check("school", errorRequired("school")).not().isEmpty(),
        check("degree", errorRequired("degree")).not().isEmpty(),
        check("startDate", errorRequired("startDate")).not().isEmpty(),
        validateFields,
        validateJWT,
        EducationController.updateEducation,
      ]);
    this.app
      .route(`/education/:educationId`)
      .delete([validateJWT, EducationController.deleteEducation]);
    return this.app;
  }
}
