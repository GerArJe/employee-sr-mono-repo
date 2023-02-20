import { Application } from "express";
import { check } from "express-validator";

import { RouteConfig } from "../models/route-config.model";
import CertificationController from "../controllers/certification.controller";
import { validateJWT } from "../middlewares/validate-jwt";
import { errorRequired } from "../utils/messages/error-messages";
import { validateFields } from "../middlewares/validate-fields";

export class CertificationRoutes extends RouteConfig {
  constructor(app: Application) {
    super(app, "CertificationRoutes");
  }
  configureRoutes() {
    this.app
      .route(`/certifications`)
      .get([validateJWT, CertificationController.getCertifications]);
    this.app
      .route(`/certifications`)
      .post([
        check("employeeId", errorRequired("employeeId")).not().isEmpty(),
        check("name", errorRequired("name")).not().isEmpty(),
        check("issuingOrganization", errorRequired("issuingOrganization"))
          .not()
          .isEmpty(),
        check("issueDate", errorRequired("issueDate")).not().isEmpty(),
        validateFields,
        validateJWT,
        CertificationController.createCertification,
      ]);
    this.app
      .route(`/certifications/employee/:employeeId`)
      .get([validateJWT, CertificationController.getCertificationsByEmployee]);
    this.app
      .route(`/certifications/:certificationId`)
      .put([
        check("employeeId", errorRequired("employeeId")).not().isEmpty(),
        check("name", errorRequired("name")).not().isEmpty(),
        check("issuingOrganization", errorRequired("issuingOrganization"))
          .not()
          .isEmpty(),
        check("issueDate", errorRequired("issueDate")).not().isEmpty(),
        validateFields,
        validateJWT,
        CertificationController.updateCertification,
      ]);
      this.app
      .route(`/certifications/:certificationId`)
      .delete([
        validateJWT,
        CertificationController.deleteCertification,
      ]);
    return this.app;
  }
}
