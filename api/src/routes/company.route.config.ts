import { Application } from "express";
import { check } from "express-validator";

import { RouteConfig } from "../models/route-config.model";
import CompanyController from "../controllers/company.controller";
import { validateJWT } from "../middlewares/validate-jwt";
import { validateFields } from "../middlewares/validate-fields";
import { errorRequired } from "../utils/messages/error-messages";

export class CompanyRoutes extends RouteConfig {
  constructor(app: Application) {
    super(app, "CompanyRoutes");
  }
  configureRoutes() {
    this.app
      .route(`/companies`)
      .get([validateJWT, CompanyController.getCompanies]);
    this.app
      .route(`/companies`)
      .post([
        check("accountId", errorRequired("accountId")).not().isEmpty(),
        check("name", errorRequired("name")).not().isEmpty(),
        check("nit", errorRequired("nit")).not().isEmpty(),
        validateFields,
        CompanyController.createCompany,
      ]);
    this.app
      .route(`/companies/:companyId`)
      .put([
        check("accountId", errorRequired("accountId")).not().isEmpty(),
        check("name", errorRequired("name")).not().isEmpty(),
        check("nit", errorRequired("nit")).not().isEmpty(),
        check("cellphone", errorRequired("cellphone")).not().isEmpty(),
        check("employeesNumber", errorRequired("employeesNumber"))
          .not()
          .isEmpty(),
        check("creationDate", errorRequired("creationDate")).not().isEmpty(),
        check("classificationId", errorRequired("classificationId"))
          .not()
          .isEmpty(),
        check("web", errorRequired("web")).not().isEmpty(),
        validateFields,
        validateJWT,
        CompanyController.updateCompany,
      ]);
    this.app
      .route(`/companies/:companyId`)
      .delete([validateJWT, CompanyController.deleteCompany]);
    this.app
      .route(`/companies/:companyId`)
      .get([validateJWT, CompanyController.getCompanyById]);
    return this.app;
  }
}
