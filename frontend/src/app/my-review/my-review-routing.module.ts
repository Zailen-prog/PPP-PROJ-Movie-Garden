import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MyReviewComponent} from "./my-review.component";
;

const routes: Routes = [
    {
        path: '',
        component: MyReviewComponent,
    },
    {path: '**', redirectTo: '/myReview'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [
  ],
  exports: [RouterModule]
})
export class MyReviewRoutingModule { }
