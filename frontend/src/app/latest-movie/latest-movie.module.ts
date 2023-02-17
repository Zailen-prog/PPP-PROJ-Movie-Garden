import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared-module/shared.module";
import {CommonModule} from "@angular/common";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDividerModule} from "@angular/material/divider";
import {LatestMovieComponent} from "./latest-movie.component";
import {LatestMovieRoutingModule} from "./latest-movie-routing.module";


@NgModule({
     declarations: [
       LatestMovieComponent,
     ],
    exports: [
      LatestMovieComponent,
    ],
  imports: [
    CommonModule,
    SharedModule,
    MatGridListModule,
    MatDividerModule,
    LatestMovieRoutingModule

  ]
})

export class LatestMovieModule { }
