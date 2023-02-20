import { Application } from "express";

import { RouteConfig } from "../models/route-config.model";
import CityController from "../controllers/city.controller";

export class CityRoutes extends RouteConfig {
  constructor(app: Application) {
    super(app, "CityRoutes");
  }
  configureRoutes() {
    this.app.route(`/cities`).get([CityController.getCities]);
    return this.app;
  }
}
