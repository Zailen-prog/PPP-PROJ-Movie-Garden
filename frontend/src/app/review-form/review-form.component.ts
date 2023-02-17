import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent {

  ratingNumber: number[] = [1,2,3,4,5,6,7,8,9,10];
  isEdit: boolean = false;


  reviewForm: FormGroup = new FormGroup({
    rating: new FormControl(null, [Validators.required]),
    review: new FormControl(null, [Validators.required]),
  });

  constructor(
    private route:ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
  ) {
  }

  ngOnInit(): void {

      this.route.queryParams.subscribe(params => {
        if(params['rating']) {
        this.isEdit = true;
        this.reviewForm.setValue({
          rating: Number(params['rating']),
          review: params['review'] ?? ''
        });
        }
      });



  }

  submitForm() {

    if (!this.reviewForm.valid) {
      return;
    }

    const {rating, review} = this.reviewForm.value;
    const movieId = this.route.snapshot.paramMap.get('id')!;

    if (this.isEdit) {
      this.http.post<any>(`http://localhost:8000/Movie/update_review/`,{movieId, rating, review}).subscribe();
    } else {
      this.http.post<any>(`http://localhost:8000/Movie/create_review/`,{movieId, rating, review}).subscribe();
    }
    this.router.navigate(['test'])

  }

}
