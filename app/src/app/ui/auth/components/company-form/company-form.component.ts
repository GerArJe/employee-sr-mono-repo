import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { VALIDATION_MESSAGES_REGISTER } from '../../../../core/constants/validation_messages.constant';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss'],
})
export class CompanyFormComponent implements OnInit {
  @Input() form!: FormGroup;
  validation_messages = VALIDATION_MESSAGES_REGISTER;

  constructor() {}

  ngOnInit() {}
}
