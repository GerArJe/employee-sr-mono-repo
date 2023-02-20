import { Application } from "express";
import { check } from "express-validator";

import { RouteConfig } from "../models/route-config.model";
import AuthController from "../controllers/auth.controller";
import { errorRequired } from "../utils/messages/error-messages";
import { validateFields } from "../middlewares/validate-fields";

export class AuthRoutes extends RouteConfig {
  constructor(app: Application) {
    super(app, "AuthRoutes");
  }
  configureRoutes() {
    this.app
      .route(`/token/get-token`)
      .post([
        check("accountId", errorRequired("accountId")).not().isEmpty(),
        validateFields,
        AuthController.getToken,
      ]);
    return this.app;
  }
}
