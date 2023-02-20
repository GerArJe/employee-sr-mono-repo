import * as http from "http";

import express, { Express } from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import { RouteConfig } from "./models/route-config.model";
import { ExperienceRoutes } from "./routes/experience.route.config";
import { ProfileRoutes } from "./routes/profile.route.config";
import { CityRoutes } from "./routes/city.route.config";
import { EmployeeRoutes } from "./routes/employee.route.config";
import { CompanyClassificationRoutes } from "./routes/company-classification.config";
import { CompanyRoutes } from "./routes/company.route.config";
import { EducationRoutes } from "./routes/education.route.config";
import { CertificationRoutes } from "./routes/certification.config.route";
import { RatingRoutes } from "./routes/rating.route.config";
import { errorNotFoundMessage } from "./utils/messages/error-messages";
import { AuthRoutes } from "./routes/auth.route.config";

const routes: Array<RouteConfig> = [];

const app: Express = express();

dotenv.config();

app.use(express.json());
app.use(cors());

// Routes
routes.push(new ExperienceRoutes(app));
routes.push(new ProfileRoutes(app));
routes.push(new CityRoutes(app));
routes.push(new EmployeeRoutes(app));
routes.push(new CompanyClassificationRoutes(app));
routes.push(new CompanyRoutes(app));
routes.push(new EducationRoutes(app));
routes.push(new CertificationRoutes(app));
routes.push(new RatingRoutes(app));
routes.push(new AuthRoutes(app));
app.all("*", (req, res) => {
  errorNotFoundMessage(res);
});

const server: http.Server = http.createServer(app);
server.listen(process.env.PORT, () => {
  console.log(`Express is listening at http://localhost:${process.env.PORT}`);
  routes.forEach((route: RouteConfig) => {
    console.log(`Routes configured for ${route.getName()}`);
  });
});
