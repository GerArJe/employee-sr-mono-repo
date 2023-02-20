import { Component, OnInit } from '@angular/core';

import { UserType } from '../../core/enums/user-type.enum';
import { AuthUseCase } from '../../core/usecases/auth.usecase';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  userType?: number;
  UserTypes = UserType;

  constructor(private authUseCase: AuthUseCase) {}

  async ngOnInit(): Promise<void> {
    this.userType = this.authUseCase.getUserType();
  }
}
