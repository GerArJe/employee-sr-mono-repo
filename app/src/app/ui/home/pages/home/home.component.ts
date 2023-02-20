import { Component, OnInit, ViewChild } from '@angular/core';
import { firstValueFrom, forkJoin, map, switchMap } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import {
  AlertOptions,
  InfiniteScrollCustomEvent,
  LoadingOptions,
  ToastOptions,
} from '@ionic/angular';

import { IEmployee } from '../../../../core/models/employee.model';
import { IProfile } from '../../../../core/models/profile.model';
import { ICity } from '../../../../core/models/city.model';
import { IExperience } from '../../../../core/models/experience.model';
import { IEducation } from '../../../../core/models/education.model';
import { ICertification } from '../../../../core/models/certification.model';
import { ICreateRatingDTO } from '../../../../core/models/rating.model';
import { RatingUseCase } from '../../../../core/usecases/rating.usecase';
import { ExperienceUseCase } from '../../../../core/usecases/experience.usecase';
import { CityUseCase } from '../../../../core/usecases/city.usecase';
import { ProfileUseCase } from '../../../../core/usecases/profile.usecase';
import { EducationUseCase } from '../../../../core/usecases/education.usecase';
import { CertificationUseCase } from '../../../../core/usecases/certification.usecase';
import { DEFAULT_DURATION_TOAST } from '../../../../core/constants/number.constant';
import { LoadingService } from '../../../../shared/services/loading.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { EmployeeInfoComponent } from '../../../user/components/employee-info/employee-info.component';
import { ContactInfoComponent } from '../../components/contact-info/contact-info.component';
import { RatingComponent } from '../../components/rating/rating.component';
import { FiltersComponent } from '../../components/filters/filters.component';
import { IFilters } from '../../../../core/models/filter.model';
import { AuthUseCase } from '../../../../core/usecases/auth.usecase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('employeeInfo') employeeInfoComponent!: EmployeeInfoComponent;
  @ViewChild('contactInfo') contactInfoComponent!: ContactInfoComponent;
  @ViewChild('rating') ratingComponent!: RatingComponent;
  @ViewChild('filtersComponent') filtersComponent!: FiltersComponent;
  searchText: string = '';
  employees: IEmployee[] = [];
  employeesBackup: IEmployee[] = [];
  failGetRecommendations: boolean = false;
  companyId: string = '';
  page: number = 1;
  offset: number = 10;
  countersRetry: number = 0;
  employeeSelected: IEmployee = {
    id: '',
    accountId: '',
    name: '',
    profileId: '',
    cityId: '',
  };
  experiencesEmployeeSelected: IExperience[] = [];
  educationEmployeeSelected: IEducation[] = [];
  certificationsEmployeeSelected: ICertification[] = [];
  profiles: IProfile[] = [];
  cities: ICity[] = [];
  filters?: IFilters;
  filtersText: string = '';

  constructor(
    private translateService: TranslateService,
    private ratingUseCase: RatingUseCase,
    private loadingService: LoadingService,
    private profileUseCase: ProfileUseCase,
    private cityUseCase: CityUseCase,
    private alertService: AlertService,
    private experienceUseCase: ExperienceUseCase,
    private educationUseCase: EducationUseCase,
    private certificationUseCase: CertificationUseCase,
    private toastService: ToastService,
    private authUseCase: AuthUseCase
  ) {}

  async ngOnInit() {
    this.searchText = await firstValueFrom(this.translateService.get('SEARCH'));
    this.companyId = this.authUseCase.getId();
    this.getRecommendations(true);
  }

  openFilters() {
    this.filtersComponent.open();
  }

  async getRecommendations(isFirstTime?: boolean, scrollEvent?: any) {
    let loading: HTMLIonLoadingElement;
    if (isFirstTime) {
      const loadingOpts: LoadingOptions = {
        message: await firstValueFrom(this.translateService.get('LOADING')),
      };
      loading = await this.loadingService.showLoading(loadingOpts);
      loading.present();
    }
    forkJoin([this.profileUseCase.getProfiles(), this.cityUseCase.getCities()])
      .pipe(
        switchMap((valuesList: [IProfile[], ICity[]]) =>
          this.ratingUseCase
            .getRecommendations(this.companyId, this.page, this.offset)
            .pipe(
              map((employees) => {
                return {
                  employees: employees.map((employee) => {
                    const employeeResult: IEmployee = {
                      ...employee,
                      profile: valuesList[0].find(
                        (profile) => profile.id === employee.profileId
                      )?.name,
                      city: valuesList[1].find(
                        (city) => city.id === employee.cityId
                      )?.name,
                    };
                    return employeeResult;
                  }),
                  profiles: valuesList[0],
                  cities: valuesList[1],
                };
              })
            )
        )
      )
      .subscribe({
        next: (value: {
          employees: IEmployee[];
          profiles: IProfile[];
          cities: ICity[];
        }) => {
          loading?.dismiss();
          this.failGetRecommendations = false;
          this.countersRetry = 0;
          if (scrollEvent) {
            (scrollEvent as InfiniteScrollCustomEvent)?.target.complete();
            this.employees = JSON.parse(
              JSON.stringify(this.employees.concat(...value.employees))
            );
            this.employeesBackup = JSON.parse(
              JSON.stringify(this.employeesBackup.concat(...value.employees))
            );
          } else {
            this.employees = JSON.parse(JSON.stringify(value.employees));
            this.employeesBackup = JSON.parse(JSON.stringify(value.employees));
          }
          if (!isFirstTime) {
            this.filter();
          }
          this.cities = JSON.parse(JSON.stringify(value.cities));
          this.profiles = JSON.parse(JSON.stringify(value.profiles));
          this.page++;
        },
        error: () => {
          loading?.dismiss();
          this.onErrorGetRecommendations(isFirstTime);
          (scrollEvent as InfiniteScrollCustomEvent)?.target.complete();
        },
      });
  }

  async onErrorGetRecommendations(isFirstTime?: boolean) {
    if (isFirstTime) {
      this.failGetRecommendations = true;
      this.countersRetry++;
    }
    const opts: AlertOptions = {
      header: await firstValueFrom(
        this.translateService.get('HOME.ERROR_MESSAGES.ERROR')
      ),
      subHeader: await firstValueFrom(
        this.translateService.get('HOME.ERROR_MESSAGES.GET_RECOMMENDATIONS')
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

  onIonInfinite(ev: any) {
    this.getRecommendations(false, ev);
  }

  async onViewMoreClicked(employee: IEmployee) {
    const loadingOpts: LoadingOptions = {
      message: await firstValueFrom(this.translateService.get('LOADING')),
    };
    const loading = await this.loadingService.showLoading(loadingOpts);
    loading.present();
    this.employeeSelected = { ...employee };
    forkJoin([
      this.experienceUseCase.getExperiencesByEmployee(this.employeeSelected.id),
      this.educationUseCase.getEducationsByEmployee(this.employeeSelected.id),
      this.certificationUseCase.getCertificationsByEmployee(
        this.employeeSelected.id
      ),
    ]).subscribe({
      next: (value: [IExperience[], IEducation[], ICertification[]]) => {
        this.experiencesEmployeeSelected = [...value[0]];
        this.educationEmployeeSelected = [...value[1]];
        this.certificationsEmployeeSelected = [...value[2]];
        loading.dismiss();
        this.employeeInfoComponent.open();
      },
      error: () => {
        loading.dismiss();
        this.onErrorGetEmployeeInfo();
      },
    });
  }

  async onErrorGetEmployeeInfo() {
    const opts: AlertOptions = {
      header: await firstValueFrom(
        this.translateService.get('HOME.ERROR_MESSAGES.ERROR')
      ),
      subHeader: await firstValueFrom(
        this.translateService.get('HOME.ERROR_MESSAGES.GET_EMPLOYEE_INFO')
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

  onRattingButtonClicked() {
    this.ratingComponent.open();
  }

  onContactInfoButtonClicked() {
    this.contactInfoComponent.open();
  }

  async onSave(rating: number) {
    const loadingOpts: LoadingOptions = {
      message: await firstValueFrom(this.translateService.get('SAVING')),
    };
    const loading = await this.loadingService.showLoading(loadingOpts);
    loading.present();
    const createRatingDTO: ICreateRatingDTO = {
      companyId: this.companyId,
      employeeId: this.employeeSelected.id,
      rating: rating,
    };
    this.ratingUseCase.createRating(createRatingDTO).subscribe({
      next: async () => {
        loading.dismiss();
        const toastOpts: ToastOptions = {
          message: await firstValueFrom(
            this.translateService.get('HOME.SUCCESS_MESSAGES.SAVE_RATING')
          ),
          duration: DEFAULT_DURATION_TOAST,
          position: 'bottom',
          color: 'success',
          keyboardClose: true,
          icon: 'checkmark-circle-outline',
        };
        await this.toastService.presentToast(toastOpts);
      },
      error: () => {
        loading.dismiss();
        this.onErrorSaveRating();
      },
    });
  }

  async onErrorSaveRating() {
    const opts: AlertOptions = {
      header: await firstValueFrom(
        this.translateService.get('HOME.ERROR_MESSAGES.ERROR')
      ),
      subHeader: await firstValueFrom(
        this.translateService.get('HOME.ERROR_MESSAGES.SAVE_RATING')
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

  filter(filters?: IFilters | undefined) {
    this.filtersComponent.close();
    this.filters = undefined;
    this.filtersText = '';
    this.employees = JSON.parse(JSON.stringify(this.employeesBackup));
    if (filters) {
      this.filters = JSON.parse(JSON.stringify(filters));
      if (this.filters?.city) {
        const filtered = this.employees.filter(
          (value) => value.cityId === this.filters?.city.id
        );
        this.employees = JSON.parse(JSON.stringify(filtered));
        this.filtersText += `${this.filters.city.name};`;
      }
      if (this.filters?.profile) {
        const filtered = this.employees.filter(
          (value) => value.profileId === this.filters?.profile.id
        );
        this.employees = JSON.parse(JSON.stringify(filtered));
        this.filtersText += `${this.filters.profile.name};`;
      }
    }
  }

  clearFilter() {
    this.filter(undefined);
    this.filtersComponent.citySelected = [];
    this.filtersComponent.profileSelected = [];
  }
}
