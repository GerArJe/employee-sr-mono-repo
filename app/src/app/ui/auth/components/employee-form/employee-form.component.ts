import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { ICity } from '../../../../core/models/city.model';
import { IProfile } from '../../../../core/models/profile.model';
import { VALIDATION_MESSAGES_REGISTER } from '../../../../core/constants/validation_messages.constant';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() cities: ICity[] = [];
  @Input() profiles: IProfile[] = [];
  validation_messages = VALIDATION_MESSAGES_REGISTER;
  placeholderProfile: string = '';
  placeholderCity: string = '';

  constructor(private translateService: TranslateService) {}

  async ngOnInit() {
    this.placeholderProfile = await firstValueFrom(
      this.translateService.get('REGISTER.PLACEHOLDER_PROFILE')
    );
    this.placeholderCity = await firstValueFrom(
      this.translateService.get('REGISTER.PLACEHOLDER_CITY')
    );
  }

  onProfileChange(event: IProfile[]) {
    this.profileIdField?.markAsTouched();
    if (event.length > 0) {
      this.profileIdField?.markAsDirty();
    }
    this.profileIdField?.setValue(event[0]?.id);
    this.profileIdField?.updateValueAndValidity();
  }

  onCityChange(event: ICity[]) {
    this.cityIdField?.markAsTouched();
    if (event.length > 0) {
      this.cityIdField?.markAsDirty();
    }
    this.cityIdField?.setValue(event[0]?.id);
    this.cityIdField?.updateValueAndValidity();
  }

  get profileIdField(): AbstractControl<any, any> | null {
    return this.form.get('profileId');
  }

  get cityIdField(): AbstractControl<any, any> | null {
    return this.form.get('cityId');
  }
}
