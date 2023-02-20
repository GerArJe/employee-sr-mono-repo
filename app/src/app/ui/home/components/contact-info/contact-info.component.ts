import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss'],
})
export class ContactInfoComponent implements OnInit {
  @Input() cellphone?: string;
  @Input() email?: string;
  isOpen: boolean = false;

  constructor() {}

  ngOnInit() {}

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }
}
