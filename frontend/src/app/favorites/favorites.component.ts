import {Component, OnInit} from '@angular/core';
import {Movie} from "../shared/models/Movie";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent  implements OnInit{

  favoriteMovie: Movie[]= [];

  constructor(
    private route:ActivatedRoute,
    private authService:AuthService,
    private router: Router,
    private http: HttpClient,
  ) {}

  getWatchedMovie(): Observable<any> {
    return this.http.get<Movie>(`http://localhost:8000/Movie/favorites_of_user/`);
  }

  ngOnInit(): void {


    const req = this.getWatchedMovie();
    req.subscribe({
      next: (res: Movie[])  => {
        this.favoriteMovie = res;
        console.log(this.favoriteMovie)
      }
    })
  }

}
