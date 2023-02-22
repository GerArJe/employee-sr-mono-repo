import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  @Output() save: EventEmitter<number> = new EventEmitter();

  isOpen: boolean = false;
  rating: boolean[] = Array(5).fill(false);

  open() {
    this.rating = Array(5).fill(false);
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  onChangeRating(indexSelected: number) {
    this.rating = this.rating.map((value, index) => {
      return index <= indexSelected ? true : false;
    });
  }

  saveRating() {
    const counter = this.rating.filter((value) => value === true).length;
    this.save.emit(counter);
    this.close();
  }
}
