import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import {
  AlertOptions,
  LoadingOptions,
  NavController,
  ToastOptions,
} from '@ionic/angular';

import { AuthUseCase } from '../../../../core/usecases/auth.usecase';
import { VALIDATION_MESSAGES_LOGIN } from '../../../../core/constants/validation_messages.constant';
import { AlertService } from '../../../../shared/services/alert.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { LoadingService } from '../../../../shared/services/loading.service';
import { DEFAULT_DURATION_TOAST } from '../../../../core/constants/number.constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  validation_messages = VALIDATION_MESSAGES_LOGIN;
  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private toastService: ToastService,
    private translateService: TranslateService,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private authUseCase: AuthUseCase
  ) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login(): Promise<void> {
    if (this.loginForm.valid) {
      const loadingOpts: LoadingOptions = {
        message: await firstValueFrom(this.translateService.get('LOADING')),
      };
      const loading = await this.loadingService.showLoading(loadingOpts);
      loading.present();
      this.authUseCase
        .loginWithEmailAndPassword(
          this.emailField?.value,
          this.passwordField?.value
        )
        .subscribe({
          error: () => {
            loading.dismiss();
            this.onErrorLogin();
          },
          complete: async () => {
            loading.dismiss();
            const toastOpts: ToastOptions = {
              message: await firstValueFrom(
                this.translateService.get('LOGIN.SUCCESS_MESSAGE')
              ),
              duration: DEFAULT_DURATION_TOAST,
              position: 'bottom',
              color: 'success',
              keyboardClose: true,
              icon: 'checkmark-circle-outline',
            };
            await this.toastService.presentToast(toastOpts);
            this.navCtrl.navigateRoot(['']);
          },
        });
    }
  }

  async onErrorLogin() {
    const opts: AlertOptions = {
      header: await firstValueFrom(
        this.translateService.get('LOGIN.ERROR_MESSAGES.ERROR')
      ),
      subHeader: await firstValueFrom(
        this.translateService.get('LOGIN.ERROR_MESSAGES.LOGIN')
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

  goToRegister(): void {
    this.navCtrl.navigateForward(['/auth/register']);
  }

  goToRecoverPassword(): void {
    this.navCtrl.navigateForward(['/auth/forgot-password']);
  }

  showHidePassword(): void {
    this.showPassword = !this.showPassword;
  }

  get emailField(): AbstractControl<any, any> | null {
    return this.loginForm.get('email');
  }

  get passwordField(): AbstractControl<any, any> | null {
    return this.loginForm.get('password');
  }
}
