import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IEmployee } from '../../../../core/models/employee.model';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss'],
})
export class EmployeeCardComponent {
  @Input() employee: IEmployee = {
    id: '',
    accountId: '',
    name: '',
    profileId: '',
    cityId: '',
  };
  @Output() viewMoreClicked: EventEmitter<any> = new EventEmitter();
}
