import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { AlertOptions, LoadingOptions, NavController } from '@ionic/angular';

import { AuthUseCase } from '../../../../core/usecases/auth.usecase';
import { AlertService } from '../../../../shared/services/alert.service';
import { LoadingService } from '../../../../shared/services/loading.service';
import { VALIDATION_MESSAGES_FORGOT_PASSWORD } from '../../../../core/constants/validation_messages.constant';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  validation_messages = VALIDATION_MESSAGES_FORGOT_PASSWORD;

  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private navCtrl: NavController,
    private authUseCase: AuthUseCase
  ) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ],
      ],
    });
  }

  ngOnInit() {}

  async recoverPassword() {
    if (this.forgotPasswordForm.valid) {
      const loadingOpts: LoadingOptions = {
        message: await firstValueFrom(this.translateService.get('LOADING')),
      };
      const loading = await this.loadingService.showLoading(loadingOpts);
      loading.present();
      this.authUseCase.recoverPassword(this.emailField?.value).subscribe({
        next: () => {
          loading.dismiss();
          this.onRecoverPasswordSuccess();
        },
        error: () => {
          loading.dismiss();
          this.onErrorRecoverPassword();
        },
      });
    }
  }

  async onRecoverPasswordSuccess() {
    const opts: AlertOptions = {
      header: await firstValueFrom(
        this.translateService.get('FORGOT_PASSWORD.TITLE_SUCCESS_MESSAGE')
      ),
      message: await firstValueFrom(
        this.translateService.get('FORGOT_PASSWORD.TEXT_SUCCESS_MESSAGE')
      ),
      buttons: [
        {
          text: await firstValueFrom(this.translateService.get('OK')),
        },
      ],
      backdropDismiss: false,
      keyboardClose: true,
    };
    await this.alertService.presentAlert(opts);
  }

  async onErrorRecoverPassword() {
    const opts: AlertOptions = {
      header: await firstValueFrom(
        this.translateService.get('FORGOT_PASSWORD.ERROR_MESSAGES.ERROR')
      ),
      subHeader: await firstValueFrom(
        this.translateService.get('FORGOT_PASSWORD.ERROR_MESSAGES.SEND_EMAIL')
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

  goToLogin() {
    this.navCtrl.navigateBack(['/auth/login']);
  }

  get emailField(): AbstractControl<any, any> | null {
    return this.forgotPasswordForm.get('email');
  }
}
