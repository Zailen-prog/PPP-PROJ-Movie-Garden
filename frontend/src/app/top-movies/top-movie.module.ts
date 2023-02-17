import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared-module/shared.module";
import {CommonModule} from "@angular/common";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDividerModule} from "@angular/material/divider";
import {TopMoviesComponent} from "./top-movies.component";
import {TopMovieRoutingModule} from "./top-movie-routing.module";

@NgModule({
     declarations: [
       TopMoviesComponent,
     ],
    exports: [
      TopMoviesComponent,
    ],
  imports: [
    CommonModule,
    SharedModule,
    MatGridListModule,
    MatDividerModule,
    TopMovieRoutingModule

  ]
})

export class TopMovieModule { }
