import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { VALIDATION_MESSAGES_ADD_LIST } from '../../../core/constants/validation_messages.constant';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss'],
})
export class AddListComponent implements OnInit {
  @Input() list: string[] = [];
  @Output() saveButtonClicked: EventEmitter<string[]> = new EventEmitter();
  isOpen: boolean = false;
  searchText: string = '';
  form!: FormGroup;
  validation_messages = VALIDATION_MESSAGES_ADD_LIST;
  listEdited: string[] = [];

  constructor(
    private translateService: TranslateService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      text: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  async ngOnInit() {
    this.searchText = await firstValueFrom(this.translateService.get('SEARCH'));
  }

  open() {
    this.listEdited =  JSON.parse(JSON.stringify(this.list));
    this.isOpen = true;
  }

  cancel() {
    this.isOpen = false;
  }

  onAdd() {
    if (this.form.valid) {
      this.listEdited.push(this.textField?.value);
      this.form.reset();
    }
  }

  get textField(): AbstractControl<any, any> | null {
    return this.form.get('text');
  }

  save() {
    this.saveButtonClicked.emit(this.listEdited);
    this.isOpen = false;
  }

  deleteItem(index: number) {
    this.listEdited.splice(index, 1);
  }
}
