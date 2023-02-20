import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IEmployee } from '../../../../core/models/employee.model';

@Component({
  selector: 'app-header-employee-info',
  templateUrl: './header-employee-info.component.html',
  styleUrls: ['./header-employee-info.component.scss'],
})
export class HeaderEmployeeInfoComponent {
  @Input() employee: IEmployee = {
    id: '',
    accountId: '',
    name: '',
    profileId: '',
    cityId: '',
  };
  @Output() editProfileClicked: EventEmitter<any> = new EventEmitter();
}
