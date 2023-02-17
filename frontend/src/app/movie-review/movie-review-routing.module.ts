import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MovieReviewComponent} from "./movie-review.component";


const routes: Routes = [
    {
        path: '',
        component: MovieReviewComponent,
    },
    {path: '**', redirectTo: '/reviews'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [
  ],
  exports: [RouterModule]
})
export class MovieReviewRoutingModule { }
