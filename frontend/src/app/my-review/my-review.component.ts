import { Component } from '@angular/core';
import {Movie} from "../shared/models/Movie";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Review} from "../shared/models/review";

@Component({
  selector: 'app-my-review',
  templateUrl: './my-review.component.html',
  styleUrls: ['./my-review.component.scss']
})
export class MyReviewComponent {
  reviews?: any;

  constructor(
    private route:ActivatedRoute,
    private http: HttpClient,
    private router: Router,
  ) {}

  getMyReviews(): Observable<any> {
    return this.http.get<Review>(`http://localhost:8000/Movie/reviews_of_user/`);
  }

  editReview(movieID: number, rating: number, review: string) {
    this.router.navigate(['editReview',movieID], { queryParams: { rating, review } })
  }

  deleteReview(movieId:number) {

    this.http.delete<any>(`http://localhost:8000/Movie/delete_review/${movieId}/`).subscribe(
      {
        next: ()=>{
          window.location.reload();
        }
      }
    );
  }

  ngOnInit(): void {

    const req = this.getMyReviews();
    req.subscribe({
      next: (res: Movie)  => {
        this.reviews = res;
        console.log(this.reviews)

      }
    })
  }
}
