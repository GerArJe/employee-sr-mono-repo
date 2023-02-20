import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';

import { NavController } from '@ionic/angular';

import { AuthUseCase } from '../usecases/auth.usecase';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authUseCase: AuthUseCase,
    private navCtrl: NavController
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.authUseCase.getToken();
    if (!token) {
      this.navCtrl.navigateRoot(['/auth/login']);
      return false;
    }
    return true;
  }
}
