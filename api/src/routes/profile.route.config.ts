import { Application } from "express";

import { RouteConfig } from "../models/route-config.model";
import ProfileController from "../controllers/profile.controller";

export class ProfileRoutes extends RouteConfig {
  constructor(app: Application) {
    super(app, "ProfileRoutes");
  }
  configureRoutes() {
    this.app
      .route(`/profiles`)
      .get([ProfileController.getProfiles]);
    return this.app;
  }
}
