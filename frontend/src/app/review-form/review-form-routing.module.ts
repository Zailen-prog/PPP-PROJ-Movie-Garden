import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ReviewFormComponent} from "./review-form.component";

const routes: Routes = [
    {
        path: '',
        component: ReviewFormComponent,
    },
    {path: '**', redirectTo: '/myReview'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [
  ],
  exports: [RouterModule]
})
export class ReviewFormRoutingModule { }
