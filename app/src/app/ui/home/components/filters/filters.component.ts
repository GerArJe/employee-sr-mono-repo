import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { IProfile } from '../../../../core/models/profile.model';
import { ICity } from '../../../../core/models/city.model';
import { SearchableSelectComponent } from '../../../../shared/components/searchable-select/searchable-select.component';
import { IFilters } from '../../../../core/models/filter.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @Input() profiles: IProfile[] = [];
  @Input() cities: ICity[] = [];
  @Output() filter: EventEmitter<IFilters> = new EventEmitter();
  @ViewChild('selectCity') selectCity!: SearchableSelectComponent;
  @ViewChild('selectProfile') selectProfile!: SearchableSelectComponent;
  form!: FormGroup;
  cityPlaceholder: string = '';
  profilePlaceholder: string = '';
  isOpen: boolean = false;
  citySelected: ICity[] = [];
  profileSelected: IProfile[] = [];

  constructor(
    private translateService: TranslateService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      cityId: [''],
      profileId: [''],
    });
  }

  async ngOnInit() {
    this.cityPlaceholder = await firstValueFrom(
      this.translateService.get('FILTERS.CITY_PLACEHOLDER')
    );
    this.profilePlaceholder = await firstValueFrom(
      this.translateService.get('FILTERS.PROFILE_PLACEHOLDER')
    );
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  onProfileChange(event: IProfile[]) {
    this.profileSelected = [...event];
    this.profileIdField?.markAsTouched();
    if (event.length > 0) {
      this.profileIdField?.markAsDirty();
    }
    this.profileIdField?.setValue(event[0]?.id);
    this.profileIdField?.updateValueAndValidity();
  }

  onCityChange(event: ICity[]) {
    this.citySelected = [...event];
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

  onFilter() {
    if (this.hasFilters()) {
      const filters: IFilters = {
        profile: this.profileSelected[0],
        city: this.citySelected[0],
      };
      this.filter.emit(filters);
    } else {
      this.filter.emit(undefined);
    }
  }

  hasFilters(): boolean {
    if (this.profileSelected[0]) {
      return true;
    }
    if (this.citySelected[0]) {
      return true;
    }
    return false;
  }
}
