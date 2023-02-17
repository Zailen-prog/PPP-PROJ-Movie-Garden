import {Component, OnInit} from '@angular/core';
import {Movie} from "../shared/models/Movie";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import * as qs from "qs";

@Component({
  selector: 'app-top-movies',
  templateUrl: './top-movies.component.html',
  styleUrls: ['./top-movies.component.scss']
})
export class TopMoviesComponent implements OnInit {
  dataSource?: Movie[];
  filter: any = {title: '', genre: '', yearOfProduction: ''};


  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
  }

  onFilterMovies(newItem: any) {
    this.filter = newItem.value;
    console.log(this.filter)
    console.log(qs.stringify(this.filter, {
      encode: false,
      allowDots: true,
      arrayFormat: 'indices',
      skipNulls: true,
      filter: this.filterFunc
    }))
    this.getFilms()
  }

  getFilms(): void {
    const url = qs.stringify(this.filter, {
      encode: false,
      allowDots: true,
      arrayFormat: 'indices',
      skipNulls: true,
      filter: this.filterFunc
    })
    console.log(url)

    this.http.get<Movie[]>(`http://localhost:8000/Movie/best/?${url}`).subscribe({
      next: (res: Movie[]) => {
        this.dataSource = res;
      }
    });
  }

  ngOnInit(): void {

    this.getFilms();

  }

  filterFunc(prefix: string, value: any) {
    if (value === '') {
      // Return an undefined value to omit a property.
      return;
    }
    return value;
  }
}
