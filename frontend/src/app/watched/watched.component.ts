import {Component, OnInit} from '@angular/core';
import {Movie} from "../shared/models/Movie";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-watched',
  templateUrl: './watched.component.html',
  styleUrls: ['./watched.component.scss']
})
export class WatchedComponent implements OnInit{

  watchedMovie: Movie[]= [];

  constructor(
    private route:ActivatedRoute,
    private authService:AuthService,
    private router: Router,
    private http: HttpClient,
  ) {}

  getWatchedMovie(): Observable<any> {
    return this.http.get<Movie>(`http://localhost:8000/Movie/watched_of_user/`);
  }

  ngOnInit(): void {


    const req = this.getWatchedMovie();
    req.subscribe({
      next: (res: Movie[])  => {
        this.watchedMovie = res;
console.log(this.watchedMovie)
      }
    })
  }



}
