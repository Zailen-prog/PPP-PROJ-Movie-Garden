import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {Movie} from "../shared/models/Movie";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit{
  isLogin: boolean = true;
  movieId: string = '';
  movieDetails?: Movie;

  constructor(
    private route:ActivatedRoute,
    private authService:AuthService,
    private router: Router,
    private http: HttpClient,
  ) {}

  getMovieDetails(): Observable<any> {
    return this.http.get<Movie>(`http://localhost:8000/Movie/${this.movieId}/`);
  }

  ngOnInit(): void {
    this.authService.isLoginMode.subscribe((value) => this.isLogin =value)
    this.movieId = this.route.snapshot.paramMap.get('idDetails')!;

    const req = this.getMovieDetails();
    req.subscribe({
      next: (res: Movie)  => {
        this.movieDetails = res;
        console.log(this.movieDetails)

      }
    })
  }
  showAllReview(movieID: number) {
    this.router.navigate(['reviews',movieID])
  }

  addNewReview() {

  }

  addToFavorite() {
    // this.http.post<any>(`https://localhost:8000/Movie/${this.movieId}`);
  }


}
