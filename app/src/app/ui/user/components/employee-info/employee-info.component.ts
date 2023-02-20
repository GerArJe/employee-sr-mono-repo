import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IEmployee } from '../../../../core/models/employee.model';
import { IExperience } from '../../../../core/models/experience.model';
import { IEducation } from '../../../../core/models/education.model';
import { ICertification } from '../../../../core/models/certification.model';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss'],
})
export class EmployeeInfoComponent {
  @Input() employee: IEmployee = {
    id: '',
    accountId: '',
    name: '',
    profileId: '',
    cityId: '',
  };
  @Input() experiences: IExperience[] = [];
  @Input() education: IEducation[] = [];
  @Input() certifications: ICertification[] = [];
  @Input() isModal: boolean = false;
  @Output() contactInfoButtonClicked: EventEmitter<any> = new EventEmitter();
  @Output() rattingButtonClicked: EventEmitter<any> = new EventEmitter();
  isOpen: boolean = false;

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }
}
