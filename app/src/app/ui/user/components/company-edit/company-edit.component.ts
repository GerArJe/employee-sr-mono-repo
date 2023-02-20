import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { DatePipe } from '@angular/common';

import { TranslateService } from '@ngx-translate/core';
import { AlertOptions, LoadingOptions, ToastOptions } from '@ionic/angular';

import {
  ICompany,
  IUpdateCompanyDTO,
} from '../../../../core/models/company.model';
import { ICompanyClassification } from '../../../../core/models/company-classification.model';
import { VALIDATION_MESSAGES_COMPANY_EDIT } from '../../../../core/constants/validation_messages.constant';
import { LoadingService } from '../../../../shared/services/loading.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { CompanyUseCase } from '../../../../core/usecases/company.usecase';
import { DEFAULT_DURATION_TOAST } from '../../../../core/constants/number.constant';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss'],
})
export class CompanyEditComponent implements OnInit, OnChanges {
  @Input() company: ICompany = {
    id: '',
    accountId: '',
    name: '',
    nit: '',
  };
  @Input() companyClassifications: ICompanyClassification[] = [];
  form!: FormGroup;
  isOpen: boolean = false;
  validation_messages = VALIDATION_MESSAGES_COMPANY_EDIT;
  date = '';
  cancelText: string = '';
  doneText: string = '';
  placeholderClassification: string = '';
  customAlertOptions = {
    header: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private companyUseCase: CompanyUseCase,
    private toastService: ToastService,
    private datePipe: DatePipe
  ) {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.company.id) {
      this.employeesNumberField?.setValue(this.company.employeesNumber);
      this.creationDateField?.setValue(this.company.creationDate);
      this.classificationIdField?.setValue(this.company.classificationId);
      this.webField?.setValue(this.company.web);
      this.cellphoneField?.setValue(this.company.cellphone);
      this.form.updateValueAndValidity();
    }
  }

  buildForm() {
    this.form = this.formBuilder.group({
      employeesNumber: [this.company.employeesNumber, [Validators.required]],
      creationDate: ['', [Validators.required]],
      classificationId: ['', [Validators.required]],
      web: ['', [Validators.required]],
      cellphone: ['', [Validators.required]],
    });
  }

  async ngOnInit(): Promise<void> {
    this.cancelText = await firstValueFrom(
      this.translateService.get('ION_DATE_TIME.CANCEL')
    );
    this.doneText = await firstValueFrom(
      this.translateService.get('ION_DATE_TIME.DONE')
    );
    this.placeholderClassification = await firstValueFrom(
      this.translateService.get('COMPANY_EDIT.CLASSIFICATION_PLACEHOLDER')
    );
    this.customAlertOptions.header = this.placeholderClassification;
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  async onSubmit() {
    if (this.form.value) {
      const loadingOpts: LoadingOptions = {
        message: await firstValueFrom(this.translateService.get('SAVING')),
      };
      const loading = await this.loadingService.showLoading(loadingOpts);
      loading.present();
      const companyUpdate: IUpdateCompanyDTO = {
        ...this.company,
        employeesNumber: this.employeesNumberField?.value,
        creationDate: this.creationDateField?.value,
        classificationId: this.classificationIdField?.value,
        web: this.webField?.value,
        cellphone: this.cellphoneField?.value,
      };
      this.companyUseCase
        .updateCompany(companyUpdate, this.company.id)
        .subscribe({
          next: async (response) => {
            this.company = { ...response };

            loading.dismiss();
            const toastOpts: ToastOptions = {
              message: await firstValueFrom(
                this.translateService.get('COMPANY_EDIT.SUCCESS_MESSAGE')
              ),
              duration: DEFAULT_DURATION_TOAST,
              position: 'bottom',
              color: 'success',
              keyboardClose: true,
              icon: 'checkmark-circle-outline',
            };
            await this.toastService.presentToast(toastOpts);
            this.close();
          },
          error: () => {
            loading.dismiss();
            this.onErrorUpdateCompany();
          },
        });
    }
  }

  async onErrorUpdateCompany() {
    const opts: AlertOptions = {
      header: await firstValueFrom(
        this.translateService.get('COMPANY_EDIT.ERROR_MESSAGES.ERROR')
      ),
      subHeader: await firstValueFrom(
        this.translateService.get('COMPANY_EDIT.ERROR_MESSAGES.UPDATE')
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

  get employeesNumberField(): AbstractControl<any, any> | null {
    return this.form.get('employeesNumber');
  }

  get creationDateField(): AbstractControl<any, any> | null {
    return this.form.get('creationDate');
  }

  get classificationIdField(): AbstractControl<any, any> | null {
    return this.form.get('classificationId');
  }

  get webField(): AbstractControl<any, any> | null {
    return this.form.get('web');
  }

  get cellphoneField(): AbstractControl<any, any> | null {
    return this.form.get('cellphone');
  }

  creationDateFieldTransformed() {
    return this.datePipe.transform(this.creationDateField?.value, 'd/M/yyyy');
  }
}
