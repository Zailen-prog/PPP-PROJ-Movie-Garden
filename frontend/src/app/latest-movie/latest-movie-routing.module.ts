import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LatestMovieComponent} from "./latest-movie.component";


const routes: Routes = [
    {
        path: '',
        component: LatestMovieComponent,
    },
    {path: '**', redirectTo: '/test'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [
  ],
  exports: [RouterModule]
})
export class LatestMovieRoutingModule { }
