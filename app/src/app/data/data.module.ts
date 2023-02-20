import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CompanyGateway } from '../core/gateways/company.gateway';
import { CompanyService } from './repositories/company/company.service';
import { EmployeeService } from './repositories/employee/employee.service';
import { EmployeeGateway } from '../core/gateways/employee.gateway';
import { CityGateway } from '../core/gateways/city.gateway';
import { ProfileGateway } from '../core/gateways/profile.gateway';
import { CityService } from './repositories/city/city.service';
import { ProfileService } from './repositories/profile/profile.service';
import { AuthGateway } from '../core/gateways/auth.gateway';
import { FirebaseAuthService } from './repositories/auth/firebase-auth.service';
import { RatingGateway } from '../core/gateways/rating.gateway';
import { RatingService } from './repositories/rating/rating.service';
import { CertificationGateway } from '../core/gateways/certification.gateway';
import { CertificationService } from './repositories/certification/certification.service';
import { CompanyClassificationGateway } from '../core/gateways/company-classification.gateway';
import { CompanyClassificationService } from './repositories/company-classification/company-classification.service';
import { EducationGateway } from '../core/gateways/education.gateway';
import { EducationService } from './repositories/education/education.service';
import { ExperienceGateway } from '../core/gateways/experience.gateway';
import { ExperienceService } from './repositories/experience/experience.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule],
  providers: [
    { provide: AuthGateway, useClass: FirebaseAuthService },
    { provide: CertificationGateway, useClass: CertificationService },
    { provide: CityGateway, useClass: CityService },
    {
      provide: CompanyClassificationGateway,
      useClass: CompanyClassificationService,
    },
    { provide: CompanyGateway, useClass: CompanyService },
    { provide: EducationGateway, useClass: EducationService },
    { provide: EmployeeGateway, useClass: EmployeeService },
    { provide: ExperienceGateway, useClass: ExperienceService },
    { provide: ProfileGateway, useClass: ProfileService },
    { provide: RatingGateway, useClass: RatingService },
  ],
})
export class DataModule {}
