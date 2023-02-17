import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Movie} from "../shared/models/Movie";
import * as qs from 'qs';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataSource?: Movie[];
  filter: any = {title: '', genre: '', yearOfProduction:''};


  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  onFilterMovies(newItem: any) {
    this.filter = newItem.value;
   console.log(this.filter)
   console.log(  qs.stringify(this.filter, { encode: false, allowDots: true, arrayFormat: 'indices', skipNulls: true, filter: this.filterFunc }))
    this.getFilms()
  }

  getFilms(): void {
    const url = qs.stringify(this.filter, { encode: false, allowDots: true, arrayFormat: 'indices', skipNulls: true, filter: this.filterFunc })

    this.http.get<Movie[]>(`http://localhost:8000/Movie/?${url}`).subscribe({
      next: (res: Movie[])  => {
        this.dataSource = res.slice(0,200);
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
