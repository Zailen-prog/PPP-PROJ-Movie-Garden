import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {

  genres: string[] = ['All', 'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Drama', 'Family', 'Fantasy',
    'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 'Thriller', 'TV Movie', 'War', 'Western']

  yearOfProduction: any[] = ['All', ...(Array.from(Array(2021 - 1902 + 1).keys()).map(x => x + 1902)).reverse()]

  @Output() filterArray = new EventEmitter<any>();


  filtersForm: FormGroup = new FormGroup({
    genre: new FormControl(null, ),
    yearOfProduction: new FormControl(null, ),
    title: new FormControl(null, ),
  });

  filterMovies() {
    this.filterArray.emit(this.filtersForm);
  }

}
