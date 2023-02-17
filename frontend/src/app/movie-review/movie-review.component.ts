import { Component } from '@angular/core';
import {Movie} from "../shared/models/Movie";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Review} from "../shared/models/review";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.scss']
})
export class MovieReviewComponent {
  isLogin: boolean = true;
  movieId: string = '';
  movieReview?: Review[];
  movieDetails?: Movie;
  isReviewed: boolean = false;

  constructor(
    private route:ActivatedRoute,
    private authService:AuthService,
    private router: Router,
    private http: HttpClient,
  ) {}

  getMovieDetails(): Observable<any> {
    return this.http.get<Movie>(`http://localhost:8000/Movie/${this.movieId}/reviews/`);
  }

  isReviewByUser (allReview: Review[]) {
    const userId = JSON.parse(localStorage.getItem('userId')!);
    this.isReviewed = allReview.some(review => review.user.id === userId)
  }

  ngOnInit(): void {
    this.authService.isLoginMode.subscribe((value) => this.isLogin =value)
    this.movieId = this.route.snapshot.paramMap.get('id')!;

    const req = this.getMovieDetails();
    req.subscribe({
      next: (res: Review[])  => {

        this.isReviewByUser(res)
        this.movieDetails = res[0].movie;
        this.movieReview = res;
      }
    })


  }
  showReviewForm(movieID: number) {
    this.router.navigate(['newReview',movieID])
  }

  // editReview(movieID: number, rating: number, review: string) {
  //   this.router.navigate(['editReview',movieID], { queryParams: { rating, review } })
  // }

}
