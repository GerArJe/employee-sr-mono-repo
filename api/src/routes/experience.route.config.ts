import { Application } from "express";
import { check } from "express-validator";

import { RouteConfig } from "../models/route-config.model";
import ExperienceController from "../controllers/experience.controller";
import { validateJWT } from "../middlewares/validate-jwt";
import { validateFields } from "../middlewares/validate-fields";
import { errorRequired } from "../utils/messages/error-messages";

export class ExperienceRoutes extends RouteConfig {
  constructor(app: Application) {
    super(app, "ExperienceRoutes");
  }
  configureRoutes() {
    this.app
      .route(`/experiences`)
      .get([validateJWT, ExperienceController.getExperiences]);
    this.app
      .route(`/experiences/employee/:employeeId`)
      .get([validateJWT, ExperienceController.getExperienceByEmployee]);
    this.app
      .route(`/experiences`)
      .post([
        check("employeeId", errorRequired("employeeId")).not().isEmpty(),
        check("title", errorRequired("title")).not().isEmpty(),
        check("companyName", errorRequired("companyName")).not().isEmpty(),
        check("startDate", errorRequired("startDate")).not().isEmpty(),
        validateFields,
        validateJWT,
        ExperienceController.createExperience,
      ]);
    this.app
      .route(`/experiences/:experienceId`)
      .put([
        check("employeeId", errorRequired("employeeId")).not().isEmpty(),
        check("title", errorRequired("title")).not().isEmpty(),
        check("companyName", errorRequired("companyName")).not().isEmpty(),
        check("startDate", errorRequired("startDate")).not().isEmpty(),
        validateFields,
        validateJWT,
        ExperienceController.updateExperience,
      ]);
    this.app
      .route(`/experiences/:experienceId`)
      .delete([validateJWT, ExperienceController.deleteExperience]);
    return this.app;
  }
}
