import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { VALIDATION_MESSAGES_EDIT_CERTIFICATION } from '../../../../core/constants/validation_messages.constant';
import {
  ICertification,
  ICreateCertificationDTO,
  IUpdateCertificationDTO,
} from '../../../../core/models/certification.model';
import { IEmployee } from '../../../../core/models/employee.model';
import { CertificationUseCase } from '../../../../core/usecases/certification.usecase';
import { AlertService } from '../../../../shared/services/alert.service';
import { LoadingService } from '../../../../shared/services/loading.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { AlertOptions, LoadingOptions, ToastOptions } from '@ionic/angular';
import { DEFAULT_DURATION_TOAST } from 'src/app/core/constants/number.constant';
import { IEducation } from 'src/app/core/models/education.model';

@Component({
  selector: 'app-edit-certification',
  templateUrl: './edit-certification.component.html',
  styleUrls: ['./edit-certification.component.scss'],
})
export class EditCertificationComponent implements OnInit {
  @Input() isModal: boolean = false;
  @Input() employee: IEmployee = {
    id: '',
    accountId: '',
    name: '',
    profileId: '',
    cityId: '',
  };
  @Input() certifications: ICertification[] = [];
  isOpen: boolean = false;
  form!: FormGroup;
  validation_messages = VALIDATION_MESSAGES_EDIT_CERTIFICATION;
  cancelText: string = '';
  doneText: string = '';
  certificationEditing: ICertification = {
    id: '',
    employeeId: '',
    name: '',
    issuingOrganization: '',
    issueDate: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private toastService: ToastService,
    private datePipe: DatePipe,
    private certificationUseCase: CertificationUseCase
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
      employeeId: [, [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      issuingOrganization: ['', [Validators.required, Validators.minLength(3)]],
      issueDate: ['', [Validators.required]],
    });
  }

  get employeeIdField(): AbstractControl<any, any> | null {
    return this.form.get('employeeId');
  }

  get nameField(): AbstractControl<any, any> | null {
    return this.form.get('name');
  }

  get issuingOrganizationField(): AbstractControl<any, any> | null {
    return this.form.get('issuingOrganization');
  }

  get issueDateField(): AbstractControl<any, any> | null {
    return this.form.get('issueDate');
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
      const createCertificationDTO: ICreateCertificationDTO = {
        employeeId: this.employeeIdField?.value,
        name: this.nameField?.value,
        issuingOrganization: this.issuingOrganizationField?.value,
        issueDate: this.issueDateField?.value,
      };
      this.certificationUseCase
        .createCertification(createCertificationDTO)
        .subscribe({
          next: async (certification: ICertification) => {
            const toastOpts: ToastOptions = {
              message: await firstValueFrom(
                this.translateService.get('EDIT_CERTIFICATION.SUCCESS_MESSAGE')
              ),
              duration: DEFAULT_DURATION_TOAST,
              position: 'bottom',
              color: 'success',
              keyboardClose: true,
              icon: 'checkmark-circle-outline',
            };
            await this.toastService.presentToast(toastOpts);
            this.certifications.push(certification);
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
        this.translateService.get('EDIT_CERTIFICATION.ERROR_MESSAGES.ERROR')
      ),
      subHeader: await firstValueFrom(
        this.translateService.get('EDIT_CERTIFICATION.ERROR_MESSAGES.CREATE')
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

  async delete(certification: ICertification, index: number) {
    const loadingOpts: LoadingOptions = {
      message: await firstValueFrom(this.translateService.get('SAVING')),
    };
    const loading = await this.loadingService.showLoading(loadingOpts);
    loading.present();
    this.certificationUseCase.deleteCertification(certification.id).subscribe({
      next: async () => {
        const toastOpts: ToastOptions = {
          message: await firstValueFrom(
            this.translateService.get('EDIT_CERTIFICATION.SUCCESS_MESSAGE')
          ),
          duration: DEFAULT_DURATION_TOAST,
          position: 'bottom',
          color: 'success',
          keyboardClose: true,
          icon: 'checkmark-circle-outline',
        };
        await this.toastService.presentToast(toastOpts);
        this.certifications.splice(index, 1);
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
        this.translateService.get('EDIT_CERTIFICATION.ERROR_MESSAGES.ERROR')
      ),
      subHeader: await firstValueFrom(
        this.translateService.get('EDIT_CERTIFICATION.ERROR_MESSAGES.DELETE')
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

  issueDateFieldTransformed() {
    return this.datePipe.transform(this.issueDateField?.value, 'd/M/yyyy');
  }

  resetForm() {
    this.certificationEditing = {
      id: '',
      employeeId: '',
      name: '',
      issuingOrganization: '',
      issueDate: '',
    };
    this.form.reset();
    this.employeeIdField?.setValue(this.employee.id);
  }

  onEdit(index: number) {
    const certification: ICertification = JSON.parse(
      JSON.stringify(this.certifications[index])
    );
    this.nameField?.setValue(certification.name);
    this.issuingOrganizationField?.setValue(certification.issuingOrganization);
    this.issueDateField?.setValue(certification.issueDate);
    this.certificationEditing = JSON.parse(JSON.stringify(certification));
  }

  async update() {
    if (this.form.valid) {
      const loadingOpts: LoadingOptions = {
        message: await firstValueFrom(this.translateService.get('SAVING')),
      };
      const loading = await this.loadingService.showLoading(loadingOpts);
      loading.present();
      const updateCertificationDTO: IUpdateCertificationDTO = {
        employeeId: this.employeeIdField?.value,
        name: this.nameField?.value,
        issuingOrganization: this.issuingOrganizationField?.value,
        issueDate: this.issueDateField?.value,
      };
      this.certificationUseCase
        .updateCertification(
          this.certificationEditing.id,
          updateCertificationDTO
        )
        .subscribe({
          next: async (certification: ICertification) => {
            const toastOpts: ToastOptions = {
              message: await firstValueFrom(
                this.translateService.get('EDIT_CERTIFICATION.SUCCESS_MESSAGE')
              ),
              duration: DEFAULT_DURATION_TOAST,
              position: 'bottom',
              color: 'success',
              keyboardClose: true,
              icon: 'checkmark-circle-outline',
            };
            await this.toastService.presentToast(toastOpts);
            const index = this.certifications.findIndex(
              (value) => value.id === certification.id
            );
            this.certifications[index] = certification;
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
        this.translateService.get('EDIT_CERTIFICATION.ERROR_MESSAGES.ERROR')
      ),
      subHeader: await firstValueFrom(
        this.translateService.get('EDIT_CERTIFICATION.ERROR_MESSAGES.UPDATE')
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
