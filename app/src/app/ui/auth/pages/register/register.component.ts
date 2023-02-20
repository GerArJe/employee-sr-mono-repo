import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  catchError,
  firstValueFrom,
  forkJoin,
  map,
  switchMap,
  throwError,
} from 'rxjs';

import {
  AlertButton,
  AlertOptions,
  LoadingOptions,
  NavController,
  ToastOptions,
} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { matchValidator } from '../../../../core/utils/match-validator';
import { UserType } from '../../../../core/enums/user-type.enum';
import { CompanyUseCase } from '../../../../core/usecases/company.usecase';
import { VALIDATION_MESSAGES_REGISTER } from '../../../../core/constants/validation_messages.constant';
import { AuthUseCase } from '../../../../core/usecases/auth.usecase';
import { IAuth } from '../../../../core/models/auth.model';
import { AlertService } from '../../../../shared/services/alert.service';
import { ICreateCompanyDTO } from '../../../../core/models/company.model';
import { LoadingService } from '../../../../shared/services/loading.service';
import { ICreateEmployeeDTO } from '../../../../core/models/employee.model';
import { EmployeeUseCase } from '../../../../core/usecases/employee.usecase';
import { EMAIL_EXISTS } from '../../../../core/constants/text.constant';
import { ProfileUseCase } from '../../../../core/usecases/profile.usecase';
import { CityUseCase } from '../../../../core/usecases/city.usecase';
import { IProfile } from '../../../../core/models/profile.model';
import { ICity } from '../../../../core/models/city.model';
import { ToastService } from '../../../../shared/services/toast.service';
import { DEFAULT_DURATION_TOAST } from '../../../../core/constants/number.constant';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  userType = UserType;
  validation_messages = VALIDATION_MESSAGES_REGISTER;
  showPassword: boolean = false;
  profiles: IProfile[] = [];
  cities: ICity[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private companyUseCase: CompanyUseCase,
    private authUseCase: AuthUseCase,
    private alertService: AlertService,
    private translateService: TranslateService,
    private loadingService: LoadingService,
    private employeeUseCase: EmployeeUseCase,
    private profileUseCase: ProfileUseCase,
    private cityUseCase: CityUseCase,
    private navCtrl: NavController,
    private toastService: ToastService
  ) {
    this.buildRegisterForm();
    this.buildCompanyForm();
    this.buildEmployeeForm();
  }

  ngOnInit() {
    this.getInitialData();
  }

  async getInitialData(): Promise<void> {
    const loadingOpts: LoadingOptions = {
      message: await firstValueFrom(this.translateService.get('LOADING')),
    };
    const loading = await this.loadingService.showLoading(loadingOpts);
    loading.present();
    forkJoin([
      this.profileUseCase.getProfiles(),
      this.cityUseCase.getCities(),
    ]).subscribe({
      next: (value: [IProfile[], ICity[]]) => {
        this.profiles = JSON.parse(JSON.stringify(value[0]));
        this.cities = JSON.parse(JSON.stringify(value[1]));
        loading.dismiss();
      },
      error: async (error) => {
        loading.dismiss();
        const opts: AlertOptions = {
          header: await firstValueFrom(
            this.translateService.get('REGISTER.ERROR_MESSAGES.ERROR')
          ),
          subHeader: await firstValueFrom(
            this.translateService.get('REGISTER.ERROR_MESSAGES.LOAD_DATA')
          ),
          backdropDismiss: false,
          buttons: [
            {
              text: await firstValueFrom(this.translateService.get('OK')),
              handler: () => {
                this.navCtrl.navigateBack(['/auth/login']);
              },
            },
          ],
          keyboardClose: true,
        };
        await this.alertService.presentAlert(opts);
      },
    });
  }

  buildRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      userType: [UserType.COMPANY, [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          matchValidator('confirmPassword', true),
        ],
      ],
      confirmPassword: ['', [Validators.required, matchValidator('password')]],
    });
    this.onChangeUserType();
  }

  buildCompanyForm() {
    return this.formBuilder.group({
      companyName: ['', [Validators.required, Validators.minLength(3)]],
      nit: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(10),
          Validators.maxLength(10),
          ,
        ],
      ],
    });
  }

  buildEmployeeForm() {
    return this.formBuilder.group({
      employeeName: ['', [Validators.required, Validators.minLength(3)]],
      profileId: ['', [Validators.required]],
      cityId: ['', [Validators.required]],
    });
  }

  async register(): Promise<void> {
    if (this.registerForm.valid) {
      const loadingOpts: LoadingOptions = {
        message: await firstValueFrom(this.translateService.get('SAVING')),
      };
      const loading = await this.loadingService.showLoading(loadingOpts);
      loading.present();
      this.authUseCase
        .createAccountWithEmailAndPassword(
          this.emailField?.value,
          this.passwordField?.value
        )
        .pipe(
          switchMap((register: IAuth) => {
            switch (this.userTypeField?.value) {
              case UserType.COMPANY:
                const company: ICreateCompanyDTO = {
                  nit: this.nitField?.value,
                  accountId: register.accountId,
                  name: this.companyNameField?.value,
                };
                return this.companyUseCase
                  .createCompany(company)
                  .pipe(
                    catchError(() =>
                      this.authUseCase
                        .deleteUser()
                        .pipe(
                          map(() => throwError(() => 'error'))
                        )
                    )
                  );
              case UserType.EMPLOYEE:
                const employee: ICreateEmployeeDTO = {
                  accountId: register.accountId,
                  name: this.employeeNameField?.value,
                  profileId: this.profileIdField?.value,
                  cityId: this.cityIdField?.value,
                };
                return this.employeeUseCase
                  .createEmployee(employee)
                  .pipe(
                    catchError(() =>
                      this.authUseCase
                        .deleteUser()
                        .pipe(
                          map(() => throwError(() => 'error'))
                        )
                    )
                  );
              default:
                return throwError(() => 'error');
            }
          })
        )
        .subscribe({
          next: async () => {
            loading.dismiss();
            const toastOpts: ToastOptions = {
              message: await firstValueFrom(
                this.translateService.get('REGISTER.SUCCESS_MESSAGE')
              ),
              duration: DEFAULT_DURATION_TOAST,
              position: 'bottom',
              color: 'success',
              keyboardClose: true,
              icon: 'checkmark-circle-outline',
            };
            await this.toastService.presentToast(toastOpts);
            this.navCtrl.navigateBack(['/auth/login']);
          },
          error: async (error) => {
            loading.dismiss();
            this.onErrorRegister(error);
          },
        });
    }
  }

  get userTypeField(): AbstractControl<any, any> | null {
    return this.registerForm.get('userType');
  }

  get nitField(): AbstractControl<any, any> | null {
    return this.registerForm.get('nit');
  }

  get companyNameField(): AbstractControl<any, any> | null {
    return this.registerForm.get('companyName');
  }

  get employeeNameField(): AbstractControl<any, any> | null {
    return this.registerForm.get('employeeName');
  }

  get profileIdField(): AbstractControl<any, any> | null {
    return this.registerForm.get('profileId');
  }

  get cityIdField(): AbstractControl<any, any> | null {
    return this.registerForm.get('cityId');
  }

  get emailField(): AbstractControl<any, any> | null {
    return this.registerForm.get('email');
  }

  get passwordField(): AbstractControl<any, any> | null {
    return this.registerForm.get('password');
  }

  showHidePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onChangeUserType(): void {
    switch (this.userTypeField?.value) {
      case UserType.COMPANY:
        this.registerForm.removeControl('employeeName');
        this.registerForm.removeControl('profileId');
        this.registerForm.removeControl('cityId');
        this.registerForm.addControl(
          'companyName',
          this.buildCompanyForm().controls.companyName
        );
        this.registerForm.addControl(
          'nit',
          this.buildCompanyForm().controls.nit
        );
        break;
      case UserType.EMPLOYEE:
        this.registerForm.removeControl('companyName');
        this.registerForm.removeControl('nit');
        this.registerForm.addControl(
          'employeeName',
          this.buildEmployeeForm().controls.employeeName
        );
        this.registerForm.addControl(
          'profileId',
          this.buildEmployeeForm().controls.profileId
        );
        this.registerForm.addControl(
          'cityId',
          this.buildEmployeeForm().controls.cityId
        );
        break;
    }
    this.profiles = this.profiles.map((profile) => {
      return {
        id: profile.id,
        name: profile.name,
        selected: false,
      };
    });
    this.cities = this.cities.map((city) => {
      return {
        id: city.id,
        name: city.name,
        selected: false,
      };
    });
  }

  async onErrorRegister(error: any): Promise<void> {
    let errorMessage: string = '';
    let alertButton: AlertButton = {
      text: await firstValueFrom(this.translateService.get('OK')),
    };
    if (error?.customData?._tokenResponse?.error?.message === EMAIL_EXISTS) {
      errorMessage = await firstValueFrom(
        this.translateService.get('REGISTER.ERROR_MESSAGES.EMAIL_EXISTS')
      );
    } else {
      errorMessage = await firstValueFrom(
        this.translateService.get(
          'REGISTER.ERROR_MESSAGES.ERROR_CREATE_ACCOUNT'
        )
      );
    }
    const opts: AlertOptions = {
      header: await firstValueFrom(
        this.translateService.get('REGISTER.ERROR_MESSAGES.ERROR')
      ),
      subHeader: errorMessage,
      backdropDismiss: false,
      buttons: [alertButton],
      keyboardClose: true,
    };
    await this.alertService.presentAlert(opts);
  }
}
