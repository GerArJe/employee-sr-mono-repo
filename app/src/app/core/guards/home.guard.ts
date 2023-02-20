import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';

import { NavController } from '@ionic/angular';

import { UserType } from '../enums/user-type.enum';
import { AuthUseCase } from '../usecases/auth.usecase';

@Injectable({
  providedIn: 'root',
})
export class HomeGuard implements CanActivate {
  constructor(
    private navCtrl: NavController,
    private authUseCase: AuthUseCase
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    let userType = this.authUseCase.getUserType();
    if (userType !== UserType.COMPANY) {
      this.navCtrl.navigateRoot(['/user']);
      return false;
    }
    return true;
  }
}
