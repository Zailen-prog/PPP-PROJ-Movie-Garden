import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared-module/shared.module";
import {CommonModule} from "@angular/common";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDividerModule} from "@angular/material/divider";
import {MyReviewComponent} from "./my-review.component";
import {MyReviewRoutingModule} from "./my-review-routing.module";

@NgModule({
     declarations: [
      MyReviewComponent
     ],
    exports: [
      MyReviewComponent
    ],
  imports: [
    CommonModule,
    MyReviewRoutingModule,
    SharedModule,
    MatGridListModule,
    MatDividerModule
  ]
})

export class MyReviewModule { }
