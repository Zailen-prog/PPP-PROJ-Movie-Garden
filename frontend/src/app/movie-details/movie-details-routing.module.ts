import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MovieDetailsComponent} from "./movie-details.component";

const routes: Routes = [
    {
        path: '',
        component: MovieDetailsComponent,
    },
    {path: '**', redirectTo: '/test'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [
  ],
  exports: [RouterModule]
})
export class MovieDetailsRoutingModule { }
