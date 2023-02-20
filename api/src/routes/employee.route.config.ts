import { Application } from "express";
import { check } from "express-validator";

import { RouteConfig } from "../models/route-config.model";
import EmployeeController from "../controllers/employee.controller";
import { validateJWT } from "../middlewares/validate-jwt";
import { validateFields } from "../middlewares/validate-fields";
import { errorRequired } from "../utils/messages/error-messages";

export class EmployeeRoutes extends RouteConfig {
  constructor(app: Application) {
    super(app, "EmployeeRoutes");
  }
  configureRoutes() {
    this.app
      .route(`/employees`)
      .get([validateJWT, EmployeeController.getEmployees]);
    this.app
      .route(`/employees/:employeeId`)
      .get([validateJWT, EmployeeController.getEmployeeById]);
    this.app
      .route(`/employees`)
      .post([
        check("accountId", errorRequired("accountId")).not().isEmpty(),
        check("name", errorRequired("name")).not().isEmpty(),
        check("profileId", errorRequired("profileId")).not().isEmpty(),
        check("cityId", errorRequired("cityId")).not().isEmpty(),
        validateFields,
        EmployeeController.createEmployee,
      ]);
    this.app
      .route(`/employees/:employeeId`)
      .put([
        check("accountId", errorRequired("accountId")).not().isEmpty(),
        check("name", errorRequired("name")).not().isEmpty(),
        check("profileId", errorRequired("profileId")).not().isEmpty(),
        check("cityId", errorRequired("cityId")).not().isEmpty(),
        check("cellphone", errorRequired("cellphone")).not().isEmpty(),
        check("email", errorRequired("email")).not().isEmpty(),
        check("about", errorRequired("about")).not().isEmpty(),
        check("skills", errorRequired("skills")).not().isEmpty(),
        check("softSkills", errorRequired("softSkills")).not().isEmpty(),
        validateFields,
        validateJWT,
        EmployeeController.updateEmployee,
      ]);
    this.app
      .route(`/employees/:employeeId`)
      .delete([validateJWT, EmployeeController.deleteEmployee]);
    return this.app;
  }
}
