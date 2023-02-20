import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';

import { EventBusService } from '../../../../shared/services/event-bus.service';
import { EventData } from '../../../../shared/models/event.model';
import { UserType } from '../../../../core/enums/user-type.enum';
import { AuthUseCase } from '../../../../core/usecases/auth.usecase';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(
    private eventBusService: EventBusService,
    private navCtrl: NavController,
    private authUseCase: AuthUseCase
  ) {}

  async ngOnInit(): Promise<void> {
    const userType = this.authUseCase.getUserType();
    this.navCtrl.navigateRoot([
      userType === UserType.COMPANY ? '/user/company-info' : '/user/user-info',
    ]);
  }

  logout() {
    this.eventBusService.emit(new EventData('logout', null));
  }
}
