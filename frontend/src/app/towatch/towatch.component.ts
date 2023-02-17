import {Component, OnInit} from '@angular/core';
import {Movie} from "../shared/models/Movie";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-towatch',
  templateUrl: './towatch.component.html',
  styleUrls: ['./towatch.component.scss']
})
export class TowatchComponent implements OnInit{

  toWatchMovie: Movie[]= [];

  constructor(
    private route:ActivatedRoute,
    private authService:AuthService,
    private router: Router,
    private http: HttpClient,
  ) {}

  getWatchedMovie(): Observable<any> {
    return this.http.get<Movie>(`http://localhost:8000/Movie/to_watch_of_user/`);
  }

  ngOnInit(): void {


    const req = this.getWatchedMovie();
    req.subscribe({
      next: (res: Movie[])  => {
        this.toWatchMovie = res;
        console.log(this.toWatchMovie)
      }
    })
  }

}
