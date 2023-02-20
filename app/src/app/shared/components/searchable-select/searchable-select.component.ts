import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { SearchbarCustomEvent } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-searchable-select',
  templateUrl: './searchable-select.component.html',
  styleUrls: ['./searchable-select.component.scss'],
})
export class SearchableSelectComponent implements OnChanges, OnInit {
  @Input() title: string = 'SEARCHABLE_SELECT.SELECT';
  @Input() data: any[] = [];
  @Input() multiple = false;
  @Input() itemTextField = '';
  @Output() selectedChanged: EventEmitter<any> = new EventEmitter();

  isOpen: boolean = false;
  @Input() selected: any[] = [];
  filtered: any[] = [];
  searchText: string = '';

  constructor(private translateService: TranslateService) {}

  async ngOnInit(): Promise<void> {
    this.searchText = await firstValueFrom(this.translateService.get('SEARCH'));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filtered = this.data;
  }

  open() {
    this.isOpen = true;
  }

  cancel() {
    this.isOpen = false;
  }

  select() {
    this.selected = this.data.filter((item) => item.selected);
    this.selectedChanged.emit(this.selected);
    this.isOpen = false;
  }

  itemSelected() {
    if (!this.multiple) {
      if (this.selected.length) {
        this.selected[0].selected = false;
        const selectedIndex = this.data.findIndex(
          (item) => item.id === this.selected[0].id
        );
        this.data[selectedIndex] = {
          ...this.data[selectedIndex],
          selected: false,
        };
      }
      this.selected = this.data.filter((item) => item.selected);
      this.selectedChanged.emit(this.selected);
      this.isOpen = false;
    }
  }

  onSearchChange(event: SearchbarCustomEvent) {
    const filter = event.detail.value?.toLowerCase();
    this.filtered = this.data.filter(
      (item) => this.leaf(item).toLowerCase().indexOf(filter) >= 0
    );
  }

  leaf(obj: any) {
    return this.itemTextField.split('.').reduce((value, el) => value[el], obj);
  }
}
