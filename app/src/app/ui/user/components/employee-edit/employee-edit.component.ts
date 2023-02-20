import { Component, Input, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { firstValueFrom, forkJoin } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { AlertOptions, LoadingOptions, ToastOptions } from '@ionic/angular';

import { VALIDATION_MESSAGES_EMPLOYEE_EDIT } from '../../../../core/constants/validation_messages.constant';
import { IEmployee } from '../../../../core/models/employee.model';
import { ICity } from '../../../../core/models/city.model';
import { IProfile } from '../../../../core/models/profile.model';
import { IExperience } from '../../../../core/models/experience.model';
import { ICertification } from '../../../../core/models/certification.model';
import { IEducation } from '../../../../core/models/education.model';
import { AddListComponent } from '../../../../shared/components/add-list/add-list.component';
import { CertificationUseCase } from '../../../../core/usecases/certification.usecase';
import { EducationUseCase } from '../../../../core/usecases/education.usecase';
import { EmployeeUseCase } from '../../../../core/usecases/employee.usecase';
import { LoadingService } from '../../../../shared/services/loading.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { DEFAULT_DURATION_TOAST } from '../../../../core/constants/number.constant';
import { EditExperiencesComponent } from '../edit-experiences/edit-experiences.component';
import { ExperienceUseCase } from '../../../../core/usecases/experience.usecase';
import { EditEducationComponent } from '../edit-education/edit-education.component';
import { EditCertificationComponent } from '../edit-certification/edit-certification.component';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss'],
})
export class EmployeeEditComponent {
  @Input() isModal: boolean = false;
  @Input() cities: ICity[] = [];
  @Input() profiles: IProfile[] = [];
  @Input() employee: IEmployee = {
    id: '',
    accountId: '',
    name: '',
    profileId: '',
    cityId: '',
  };
  @Input() experiences: IExperience[] = [];
  @Input() education: IEducation[] = [];
  @Input() certifications: ICertification[] = [];
  @ViewChild('addList') addListComponent!: AddListComponent;
  @ViewChild(EditExperiencesComponent)
  editExperiencesComponent!: EditExperiencesComponent;
  @ViewChild(EditEducationComponent)
  editEducationComponent!: EditEducationComponent;
  @ViewChild(EditCertificationComponent)
  editCertificationComponent!: EditCertificationComponent;
  isOpen: boolean = false;
  form!: FormGroup;
  validation_messages = VALIDATION_MESSAGES_EMPLOYEE_EDIT;
  citySelected: ICity[] = [];
  profileSelected: IProfile[] = [];
  editList: 'skills' | 'softSkills' = 'skills';

  constructor(
    private formBuilder: FormBuilder,
    private employeeUseCase: EmployeeUseCase,
    private experienceUseCase: ExperienceUseCase,
    private educationUseCase: EducationUseCase,
    private certificationUseCase: CertificationUseCase,
    private translateService: TranslateService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private toastService: ToastService
  ) {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      cityId: ['', [Validators.required]],
      cellphone: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ],
      ],
      profileId: ['', [Validators.required]],
      about: ['', [Validators.required]],
      skills: ['', [Validators.required]],
      softSkills: ['', [Validators.required]],
    });
  }

  get nameField(): AbstractControl<any, any> | null {
    return this.form.get('name');
  }

  get cityIdField(): AbstractControl<any, any> | null {
    return this.form.get('cityId');
  }

  get cellphoneField(): AbstractControl<any, any> | null {
    return this.form.get('cellphone');
  }

  get emailField(): AbstractControl<any, any> | null {
    return this.form.get('email');
  }

  get profileIdField(): AbstractControl<any, any> | null {
    return this.form.get('profileId');
  }

  get aboutField(): AbstractControl<any, any> | null {
    return this.form.get('about');
  }

  get skillsField(): AbstractControl<any, any> | null {
    return this.form.get('skills');
  }

  get softSkillField(): AbstractControl<any, any> | null {
    return this.form.get('softSkills');
  }

  open() {
    this.isOpen = true;
    if (this.employee.id) {
      this.nameField?.setValue(this.employee.name);
      this.cityIdField?.setValue(this.employee.cityId);
      this.cellphoneField?.setValue(this.employee.cellphone);
      this.emailField?.setValue(this.employee.email);
      this.profileIdField?.setValue(this.employee.profileId);
      this.aboutField?.setValue(this.employee.about);
      this.skillsField?.setValue(this.employee.skills);
      this.softSkillField?.setValue(this.employee.softSkills);
      const cityExist = this.cities.find(
        (city) => city.id === this.employee.cityId
      );
      const cityExistIndex = this.cities.findIndex(
        (city) => city.id === this.employee.cityId
      );
      if (cityExist) {
        this.citySelected = [{ ...cityExist, selected: true }];
        this.cities[cityExistIndex] = {
          ...this.cities[cityExistIndex],
          selected: true,
        };
      }
      let profileExist = this.profiles.find(
        (profile) => profile.id === this.employee.profileId
      );
      let profileExistIndex = this.profiles.findIndex(
        (profile) => profile.id === this.employee.profileId
      );
      if (profileExist) {
        this.profileSelected = [{ ...profileExist, selected: true }];
        this.profiles[profileExistIndex] = {
          ...this.profiles[profileExistIndex],
          selected: true,
        };
      }
    }
  }

  close() {
    this.isOpen = false;
    this.cities.forEach((city) => {
      if (city.selected) {
        city.selected = false;
      }
    });
    this.profiles.forEach((profile) => {
      if (profile.selected) {
        profile.selected = false;
      }
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      const loadingOpts: LoadingOptions = {
        message: await firstValueFrom(this.translateService.get('SAVING')),
      };
      const loading = await this.loadingService.showLoading(loadingOpts);
      loading.present();
      this.employeeUseCase
        .updateEmployee(this.employee, this.employee.id)
        .subscribe({
          next: async () => {
            const toastOpts: ToastOptions = {
              message: await firstValueFrom(
                this.translateService.get('EMPLOYEE_EDIT.SUCCESS_MESSAGE')
              ),
              duration: DEFAULT_DURATION_TOAST,
              position: 'bottom',
              color: 'success',
              keyboardClose: true,
              icon: 'checkmark-circle-outline',
            };
            await this.toastService.presentToast(toastOpts);
            loading.dismiss();
            this.close();
          },
          error: () => {
            loading.dismiss();
            this.onSubmitError();
          },
        });
    }
  }

  async onSubmitError() {
    const opts: AlertOptions = {
      header: await firstValueFrom(
        this.translateService.get('EMPLOYEE_EDIT.ERROR_MESSAGES.ERROR')
      ),
      subHeader: await firstValueFrom(
        this.translateService.get('EMPLOYEE_EDIT.ERROR_MESSAGES.UPDATE')
      ),
      backdropDismiss: false,
      buttons: [
        {
          text: await firstValueFrom(this.translateService.get('OK')),
          handler: () => {},
        },
      ],
      keyboardClose: true,
    };
    await this.alertService.presentAlert(opts);
  }

  onCityChange(event: ICity[]) {
    console.log(event);

    this.citySelected = JSON.parse(JSON.stringify(event));
    this.cityIdField?.markAsTouched();
    if (event.length > 0) {
      this.cityIdField?.markAsDirty();
    }
    this.cityIdField?.setValue(event[0]?.id);
    this.cityIdField?.updateValueAndValidity();
  }

  onProfileChange(event: IProfile[]) {
    this.profileSelected = JSON.parse(JSON.stringify(event));
    this.profileIdField?.markAsTouched();
    if (event.length > 0) {
      this.profileIdField?.markAsDirty();
    }
    this.profileIdField?.setValue(event[0]?.id);
    this.profileIdField?.updateValueAndValidity();
  }

  editSkills() {
    this.editList = 'skills';
    this.addListComponent.open();
  }

  editSoftSkills() {
    this.editList = 'softSkills';
    this.addListComponent.open();
  }

  onSaveList(list: string[]) {
    switch (this.editList) {
      case 'skills':
        this.employee.skills = JSON.parse(JSON.stringify(list));
        this.skillsField?.setValue(JSON.parse(JSON.stringify(list)));
        break;
      case 'softSkills':
        this.employee.softSkills = JSON.parse(JSON.stringify(list));
        this.softSkillField?.setValue(JSON.parse(JSON.stringify(list)));
        break;
    }
  }

  editExperiences() {
    this.editExperiencesComponent.open();
  }

  editEducation() {
    this.editEducationComponent.open();
  }

  editCertification() {
    this.editCertificationComponent.open();
  }
}
