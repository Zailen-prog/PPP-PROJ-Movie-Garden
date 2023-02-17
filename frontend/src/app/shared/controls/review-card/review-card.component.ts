import {Component, Input, OnInit} from '@angular/core';
import {Review} from "../../models/review";
import {Router} from "@angular/router";

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent implements OnInit{

  @Input() reviews?: Review[];
  userId: string = '';

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('userId')!);

  }

   editReview(movieID: number, rating: number, review: string) {
    this.router.navigate(['editReview',movieID], { queryParams: { rating, review } })
  }
}
