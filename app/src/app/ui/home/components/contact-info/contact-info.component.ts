import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss'],
})
export class ContactInfoComponent {
  @Input() cellphone?: string;
  @Input() email?: string;
  isOpen: boolean = false;

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }
}
