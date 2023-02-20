import { Component, OnInit } from '@angular/core';
import { firstValueFrom, forkJoin, switchMap } from 'rxjs';

import { AlertOptions, LoadingOptions } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { CertificationUseCase } from '../../../../core/usecases/certification.usecase';
import { EducationUseCase } from '../../../../core/usecases/education.usecase';
import { EmployeeUseCase } from '../../../../core/usecases/employee.usecase';
import { ExperienceUseCase } from '../../../../core/usecases/experience.usecase';
import { LoadingService } from '../../../../shared/services/loading.service';
import { IEmployee } from '../../../../core/models/employee.model';
import { IExperience } from '../../../../core/models/experience.model';
import { ICertification } from '../../../../core/models/certification.model';
import { IEducation } from '../../../../core/models/education.model';
import { AlertService } from '../../../../shared/services/alert.service';
import { IProfile } from '../../../../core/models/profile.model';
import { ICity } from '../../../../core/models/city.model';
import { ProfileUseCase } from '../../../../core/usecases/profile.usecase';
import { CityUseCase } from '../../../../core/usecases/city.usecase';
import { AuthUseCase } from '../../../../core/usecases/auth.usecase';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  employeeId: string = '';
  employee: IEmployee = {
    id: '',
    accountId: '',
    name: '',
    profileId: '',
    cityId: '',
  };
  experiences: IExperience[] = [];
  education: IEducation[] = [];
  certifications: ICertification[] = [];
  profiles: IProfile[] = [];
  cities: ICity[] = [];

  constructor(
    private employeeUseCase: EmployeeUseCase,
    private experienceUseCase: ExperienceUseCase,
    private educationUseCase: EducationUseCase,
    private certificationUseCase: CertificationUseCase,
    private translateService: TranslateService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private profileUseCase: ProfileUseCase,
    private cityUseCase: CityUseCase,
    private authUseCase: AuthUseCase
  ) {}

  ngOnInit() {
    this.getInitialData();
  }

  async getInitialData() {
    const loadingOpts: LoadingOptions = {
      message: await firstValueFrom(this.translateService.get('LOADING')),
    };
    const loading = await this.loadingService.showLoading(loadingOpts);
    loading.present();
    this.employeeId = this.authUseCase.getId();
    if (this.employeeId) {
      this.employeeUseCase
        .getEmployeeById(this.employeeId)
        .pipe(
          switchMap((employee: IEmployee) => {
            this.employee = employee;
            return forkJoin([
              this.experienceUseCase.getExperiencesByEmployee(this.employeeId),
              this.educationUseCase.getEducationsByEmployee(this.employeeId),
              this.certificationUseCase.getCertificationsByEmployee(
                this.employeeId
              ),
              this.profileUseCase.getProfiles(),
              this.cityUseCase.getCities(),
            ]);
          })
        )
        .subscribe({
          next: (
            value: [
              IExperience[],
              IEducation[],
              ICertification[],
              IProfile[],
              ICity[]
            ]
          ) => {
            this.employee = {
              ...this.employee,
              profile: value[3].find(
                (profile) => profile.id === this.employee.profileId
              )?.name,
              city: value[4].find((city) => city.id === this.employee.cityId)?.name,
            };
            this.experiences = value[0];
            this.education = value[1];
            this.certifications = value[2];
            this.profiles = JSON.parse(JSON.stringify(value[3]));
            this.cities = JSON.parse(JSON.stringify(value[4]));
            loading.dismiss();
          },
          error: () => {
            loading.dismiss();
            this.onErrorGetInitialData();
          },
        });
    } else {
      this.onErrorGetInitialData();
    }
  }

  async onErrorGetInitialData() {
    const opts: AlertOptions = {
      header: await firstValueFrom(
        this.translateService.get('EMPLOYEE_PAGE.ERROR_MESSAGES.ERROR')
      ),
      subHeader: await firstValueFrom(
        this.translateService.get(
          'EMPLOYEE_PAGE.ERROR_MESSAGES.GET_INITIAL_DATA'
        )
      ),
      backdropDismiss: false,
      buttons: [
        {
          text: await firstValueFrom(this.translateService.get('OK')),
        },
      ],
      keyboardClose: true,
    };
    await this.alertService.presentAlert(opts);
  }
}
