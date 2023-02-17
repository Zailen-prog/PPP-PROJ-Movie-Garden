import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared-module/shared.module";
import {CommonModule} from "@angular/common";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDividerModule} from "@angular/material/divider";
import {MovieReviewComponent} from "./movie-review.component";
import {MovieReviewRoutingModule} from "./movie-review-routing.module";

@NgModule({
     declarations: [
       MovieReviewComponent
     ],
    exports: [
      MovieReviewComponent
    ],
  imports: [
    CommonModule,
    SharedModule,
    MovieReviewRoutingModule,
    MatGridListModule,
    MatDividerModule
  ]
})

export class MovieReviewModule { }
