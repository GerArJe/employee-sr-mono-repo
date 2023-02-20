import { Component, OnInit, ViewChild } from '@angular/core';
import { firstValueFrom, forkJoin } from 'rxjs';

import { AlertOptions, LoadingOptions } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { CompanyUseCase } from '../../../../core/usecases/company.usecase';
import { LoadingService } from '../../../../shared/services/loading.service';
import { ICompany } from '../../../../core/models/company.model';
import { AlertService } from '../../../../shared/services/alert.service';
import { CompanyEditComponent } from '../company-edit/company-edit.component';
import { CompanyClassificationUseCase } from '../../../../core/usecases/company-classification.usecase';
import { ICompanyClassification } from '../../../../core/models/company-classification.model';
import { AuthUseCase } from '../../../../core/usecases/auth.usecase';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss'],
})
export class CompanyInfoComponent implements OnInit {
  @ViewChild('companyEdit') companyEditComponent!: CompanyEditComponent;
  companyId: string = '';
  company: ICompany = {
    id: '',
    accountId: '',
    name: '',
    nit: '',
  };
  companyClassifications: ICompanyClassification[] = [];

  constructor(
    private companyUserCase: CompanyUseCase,
    private translateService: TranslateService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private companyClassificationUseCase: CompanyClassificationUseCase,
    private authUseCase: AuthUseCase
  ) {}

  async ngOnInit() {
    this.companyId = this.authUseCase.getId();
    this.getInitialData();
  }

  async getInitialData() {
    const loadingOpts: LoadingOptions = {
      message: await firstValueFrom(this.translateService.get('LOADING')),
    };
    const loading = await this.loadingService.showLoading(loadingOpts);
    loading.present();
    forkJoin([
      this.companyClassificationUseCase.getCompanyClassifications(),
      this.companyUserCase.getCompanyById(this.companyId),
    ]).subscribe({
      next: (value: [ICompanyClassification[], ICompany]) => {
        this.companyClassifications = [...value[0]];
        this.company = {
          ...value[1],
          classification: this.companyClassifications.find(
            (companyClassification) =>
              companyClassification.id === value[1].classificationId
          )?.name,
        };
        loading.dismiss();
      },
      error: () => {
        loading.dismiss();
        this.onErrorGetInitialData();
      },
    });
  }

  async onErrorGetInitialData() {
    const opts: AlertOptions = {
      header: await firstValueFrom(
        this.translateService.get('COMPANY_EDIT.ERROR_MESSAGES.ERROR')
      ),
      subHeader: await firstValueFrom(
        this.translateService.get('COMPANY_EDIT.ERROR_MESSAGES.INITIAL_DATA')
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
