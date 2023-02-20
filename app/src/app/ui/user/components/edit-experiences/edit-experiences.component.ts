import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { AlertOptions, LoadingOptions, ToastOptions } from '@ionic/angular';

import {
  ICreateExperienceDTO,
  IExperience,
  IUpdateExperienceDTO,
} from '../../../../core/models/experience.model';
import { ExperienceUseCase } from '../../../../core/usecases/experience.usecase';
import { AlertService } from '../../../../shared/services/alert.service';
import { LoadingService } from '../../../../shared/services/loading.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { IEmployee } from '../../../../core/models/employee.model';
import { VALIDATION_MESSAGES_EDIT_EXPERIENCES } from '../../../../core/constants/validation_messages.constant';
import { DEFAULT_DURATION_TOAST } from '../../../../core/constants/number.constant';

@Component({
  selector: 'app-edit-experiences',
  templateUrl: './edit-experiences.component.html',
  styleUrls: ['./edit-experiences.component.scss'],
})
export class EditExperiencesComponent implements OnInit {
  @Input() isModal: boolean = false;
  @Input() employee: IEmployee = {
    id: '',
    accountId: '',
    name: '',
    profileId: '',
    cityId: '',
  };
  @Input() experiences: IExperience[] = [];
  isOpen: boolean = false;
  form!: FormGroup;
  validation_messages = VALIDATION_MESSAGES_EDIT_EXPERIENCES;
  cancelText: string = '';
  doneText: string = '';
  experienceEditing: IExperience = {
    id: '',
    employeeId: '',
    title: '',
    companyName: '',
    startDate: '',
  };

  constructor(
    private experienceUseCase: ExperienceUseCase,
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private toastService: ToastService,
    private datePipe: DatePipe
  ) {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      employeeId: [, [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      companyName: ['', [Validators.required, Validators.minLength(3)]],
      startDate: ['', [Validators.required]],
      present: [false],
      endDate: [''],
      description: [''],
    });
  }

  get employeeIdField(): AbstractControl<any, any> | null {
    return this.form.get('employeeId');
  }

  get titleField(): AbstractControl<any, any> | null {
    return this.form.get('title');
  }

  get companyNameField(): AbstractControl<any, any> | null {
    return this.form.get('companyName');
  }

  get startDateField(): AbstractControl<any, any> | null {
    return this.form.get('startDate');
  }

  get endDateField(): AbstractControl<any, any> | null {
    return this.form.get('endDate');
  }

  get descriptionField(): AbstractControl<any, any> | null {
    return this.form.get('description');
  }

  get presentField(): AbstractControl<any, any> | null {
    return this.form.get('present');
  }

  async ngOnInit() {
    this.cancelText = await firstValueFrom(
      this.translateService.get('ION_DATE_TIME.CANCEL')
    );
    this.doneText = await firstValueFrom(
      this.translateService.get('ION_DATE_TIME.DONE')
    );
  }

  open() {
    this.employeeIdField?.setValue(this.employee.id);
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  async create() {
    if (this.form.valid) {
      const loadingOpts: LoadingOptions = {
        message: await firstValueFrom(this.translateService.get('SAVING')),
      };
      const loading = await this.loadingService.showLoading(loadingOpts);
      loading.present();
      const createExperience: ICreateExperienceDTO = {
        employeeId: this.employeeIdField?.value,
        title: this.titleField?.value,
        companyName: this.companyNameField?.value,
        startDate: this.startDateField?.value,
        endDate: this.endDateField?.value,
        description: this.descriptionField?.value,
      };
      this.experienceUseCase.createExperience(createExperience).subscribe({
        next: async (experience: IExperience) => {
          const toastOpts: ToastOptions = {
            message: await firstValueFrom(
              this.translateService.get('EDIT_EXPERIENCES.SUCCESS_MESSAGE')
            ),
            duration: DEFAULT_DURATION_TOAST,
            position: 'bottom',
            color: 'success',
            keyboardClose: true,
            icon: 'checkmark-circle-outline',
          };
          await this.toastService.presentToast(toastOpts);
          this.experiences.push(experience);
          this.resetForm();
          loading.dismiss();
        },
        error: () => {
          loading.dismiss();
          this.onErrorCreate();
        },
      });
    }
  }

  async onErrorCreate() {
    const opts: AlertOptions = {
      header: await firstValueFrom(
        this.translateService.get('EDIT_EXPERIENCES.ERROR_MESSAGES.ERROR')
      ),
      subHeader: await firstValueFrom(
        this.translateService.get('EDIT_EXPERIENCES.ERROR_MESSAGES.CREATE')
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

  async delete(experience: IExperience, index: number) {
    const loadingOpts: LoadingOptions = {
      message: await firstValueFrom(this.translateService.get('SAVING')),
    };
    const loading = await this.loadingService.showLoading(loadingOpts);
    loading.present();
    this.experienceUseCase.deleteExperience(experience.id).subscribe({
      next: async () => {
        const toastOpts: ToastOptions = {
          message: await firstValueFrom(
            this.translateService.get('EDIT_EXPERIENCES.SUCCESS_MESSAGE')
          ),
          duration: DEFAULT_DURATION_TOAST,
          position: 'bottom',
          color: 'success',
          keyboardClose: true,
          icon: 'checkmark-circle-outline',
        };
        await this.toastService.presentToast(toastOpts);
        this.experiences.splice(index, 1);
        loading.dismiss();
      },
      error: () => {
        loading.dismiss();
        this.onDeleteError();
      },
    });
  }

  async onDeleteError() {
    const opts: AlertOptions = {
      header: await firstValueFrom(
        this.translateService.get('EDIT_EXPERIENCES.ERROR_MESSAGES.ERROR')
      ),
      subHeader: await firstValueFrom(
        this.translateService.get('EDIT_EXPERIENCES.ERROR_MESSAGES.DELETE')
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

  startDateFieldTransformed() {
    return this.datePipe.transform(this.startDateField?.value, 'd/M/yyyy');
  }

  endDateFieldTransformed() {
    return this.datePipe.transform(this.endDateField?.value, 'd/M/yyyy');
  }

  resetForm() {
    this.experienceEditing = {
      id: '',
      employeeId: '',
      title: '',
      companyName: '',
      startDate: '',
    };
    this.form.reset();
    this.employeeIdField?.setValue(this.employee.id);
  }

  onEdit(index: number) {
    const experience: IExperience = JSON.parse(
      JSON.stringify(this.experiences[index])
    );
    this.titleField?.setValue(experience.title);
    this.companyNameField?.setValue(experience.companyName);
    this.startDateField?.setValue(experience.startDate);
    this.presentField?.setValue(experience.endDate ? false : true);
    this.endDateField?.setValue(experience.endDate);
    this.descriptionField?.setValue(experience.description);
    this.experienceEditing = JSON.parse(JSON.stringify(experience));
  }

  async update() {
    if (this.form.valid) {
      const loadingOpts: LoadingOptions = {
        message: await firstValueFrom(this.translateService.get('SAVING')),
      };
      const loading = await this.loadingService.showLoading(loadingOpts);
      loading.present();
      const updateExperienceDTO: IUpdateExperienceDTO = {
        employeeId: this.employeeIdField?.value,
        title: this.titleField?.value,
        companyName: this.companyNameField?.value,
        startDate: this.startDateField?.value,
        endDate: this.endDateField?.value,
        description: this.descriptionField?.value,
      };
      this.experienceUseCase
        .updateExperience(this.experienceEditing.id, updateExperienceDTO)
        .subscribe({
          next: async (experience: IExperience) => {
            const toastOpts: ToastOptions = {
              message: await firstValueFrom(
                this.translateService.get('EDIT_EXPERIENCES.SUCCESS_MESSAGE')
              ),
              duration: DEFAULT_DURATION_TOAST,
              position: 'bottom',
              color: 'success',
              keyboardClose: true,
              icon: 'checkmark-circle-outline',
            };
            await this.toastService.presentToast(toastOpts);
            const index = this.experiences.findIndex(
              (value) => value.id === experience.id
            );
            this.experiences[index] = experience;
            this.resetForm();
            loading.dismiss();
          },
          error: () => {
            loading.dismiss();
            this.onErrorUpdate();
          },
        });
    }
  }

  async onErrorUpdate() {
    const opts: AlertOptions = {
      header: await firstValueFrom(
        this.translateService.get('EDIT_EXPERIENCES.ERROR_MESSAGES.ERROR')
      ),
      subHeader: await firstValueFrom(
        this.translateService.get('EDIT_EXPERIENCES.ERROR_MESSAGES.UPDATE')
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
}
