import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { IEmployee } from '../../../../core/models/employee.model';
import {
  ICreateEducationDTO,
  IEducation,
  IUpdateEducationDTO,
} from '../../../../core/models/education.model';
import { EducationUseCase } from '../../../../core/usecases/education.usecase';
import { AlertService } from '../../../../shared/services/alert.service';
import { LoadingService } from '../../../../shared/services/loading.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { VALIDATION_MESSAGES_EDIT_EDUCATION } from '../../../../core/constants/validation_messages.constant';
import { AlertOptions, LoadingOptions, ToastOptions } from '@ionic/angular';
import { DEFAULT_DURATION_TOAST } from '../../../../core/constants/number.constant';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.scss'],
})
export class EditEducationComponent implements OnInit {
  @Input() isModal: boolean = false;
  @Input() employee: IEmployee = {
    id: '',
    accountId: '',
    name: '',
    profileId: '',
    cityId: '',
  };
  @Input() education: IEducation[] = [];
  isOpen: boolean = false;
  form!: FormGroup;
  validation_messages = VALIDATION_MESSAGES_EDIT_EDUCATION;
  cancelText: string = '';
  doneText: string = '';
  educationEditing: IEducation = {
    id: '',
    employeeId: '',
    school: '',
    degree: '',
    startDate: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private toastService: ToastService,
    private datePipe: DatePipe,
    private educationUseCase: EducationUseCase
  ) {
    this.buildForm();
  }

  async ngOnInit() {
    this.cancelText = await firstValueFrom(
      this.translateService.get('ION_DATE_TIME.CANCEL')
    );
    this.doneText = await firstValueFrom(
      this.translateService.get('ION_DATE_TIME.DONE')
    );
  }

  buildForm() {
    this.form = this.formBuilder.group({
      employeeId: ['', [Validators.required]],
      school: ['', [Validators.required, Validators.minLength(3)]],
      degree: ['', [Validators.required, Validators.minLength(3)]],
      startDate: ['', [Validators.required]],
      endDate: [''],
      present: [false],
    });
  }

  get employeeIdField(): AbstractControl<any, any> | null {
    return this.form.get('employeeId');
  }

  get schoolField(): AbstractControl<any, any> | null {
    return this.form.get('school');
  }

  get degreeField(): AbstractControl<any, any> | null {
    return this.form.get('degree');
  }

  get startDateField(): AbstractControl<any, any> | null {
    return this.form.get('startDate');
  }

  get endDateField(): AbstractControl<any, any> | null {
    return this.form.get('endDate');
  }

  get presentField(): AbstractControl<any, any> | null {
    return this.form.get('present');
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
      const createEducationDTO: ICreateEducationDTO = {
        employeeId: this.employeeIdField?.value,
        school: this.schoolField?.value,
        degree: this.degreeField?.value,
        startDate: this.startDateField?.value,
        endDate: this.endDateField?.value,
      };
      this.educationUseCase.createEducation(createEducationDTO).subscribe({
        next: async (education: IEducation) => {
          const toastOpts: ToastOptions = {
            message: await firstValueFrom(
              this.translateService.get('EDIT_EDUCATION.SUCCESS_MESSAGE')
            ),
            duration: DEFAULT_DURATION_TOAST,
            position: 'bottom',
            color: 'success',
            keyboardClose: true,
            icon: 'checkmark-circle-outline',
          };
          await this.toastService.presentToast(toastOpts);
          this.education.push(education);
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
        this.translateService.get('EDIT_EDUCATION.ERROR_MESSAGES.ERROR')
      ),
      subHeader: await firstValueFrom(
        this.translateService.get('EDIT_EDUCATION.ERROR_MESSAGES.CREATE')
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

  async delete(education: IEducation, index: number) {
    const loadingOpts: LoadingOptions = {
      message: await firstValueFrom(this.translateService.get('SAVING')),
    };
    const loading = await this.loadingService.showLoading(loadingOpts);
    loading.present();
    this.educationUseCase.deleteEducation(education.id).subscribe({
      next: async () => {
        const toastOpts: ToastOptions = {
          message: await firstValueFrom(
            this.translateService.get('EDIT_EDUCATION.SUCCESS_MESSAGE')
          ),
          duration: DEFAULT_DURATION_TOAST,
          position: 'bottom',
          color: 'success',
          keyboardClose: true,
          icon: 'checkmark-circle-outline',
        };
        await this.toastService.presentToast(toastOpts);
        this.education.splice(index, 1);
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
        this.translateService.get('EDIT_EDUCATION.ERROR_MESSAGES.ERROR')
      ),
      subHeader: await firstValueFrom(
        this.translateService.get('EDIT_EDUCATION.ERROR_MESSAGES.DELETE')
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
    this.educationEditing = {
      id: '',
      employeeId: '',
      school: '',
      degree: '',
      startDate: '',
    };
    this.form.reset();
    this.employeeIdField?.setValue(this.employee.id);
  }

  onEdit(index: number) {
    const education: IEducation = JSON.parse(
      JSON.stringify(this.education[index])
    );
    this.schoolField?.setValue(education.school);
    this.degreeField?.setValue(education.degree);
    this.startDateField?.setValue(education.startDate);
    this.endDateField?.setValue(education.endDate);
    this.educationEditing = JSON.parse(JSON.stringify(education));
  }

  async update() {
    if (this.form.valid) {
      const loadingOpts: LoadingOptions = {
        message: await firstValueFrom(this.translateService.get('SAVING')),
      };
      const loading = await this.loadingService.showLoading(loadingOpts);
      loading.present();
      const updateEducationDTO: IUpdateEducationDTO = {
        employeeId: this.employeeIdField?.value,
        school: this.schoolField?.value,
        degree: this.degreeField?.value,
        startDate: this.startDateField?.value,
        endDate: this.endDateField?.value,
      };
      this.educationUseCase
        .updateEducation(this.educationEditing.id, updateEducationDTO)
        .subscribe({
          next: async (education: IEducation) => {
            const toastOpts: ToastOptions = {
              message: await firstValueFrom(
                this.translateService.get('EDIT_EDUCATION.SUCCESS_MESSAGE')
              ),
              duration: DEFAULT_DURATION_TOAST,
              position: 'bottom',
              color: 'success',
              keyboardClose: true,
              icon: 'checkmark-circle-outline',
            };
            await this.toastService.presentToast(toastOpts);
            const index = this.education.findIndex(
              (value) => value.id === education.id
            );
            this.education[index] = education;
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
        this.translateService.get('EDIT_EDUCATION.ERROR_MESSAGES.ERROR')
      ),
      subHeader: await firstValueFrom(
        this.translateService.get('EDIT_EDUCATION.ERROR_MESSAGES.UPDATE')
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
