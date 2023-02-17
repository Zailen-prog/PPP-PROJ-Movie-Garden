import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared-module/shared.module";
import {CommonModule} from "@angular/common";
import {MovieDetailsComponent} from "./movie-details.component";
import {MovieDetailsRoutingModule} from "./movie-details-routing.module";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDividerModule} from "@angular/material/divider";

@NgModule({
     declarations: [
         MovieDetailsComponent
     ],
    exports: [
      MovieDetailsComponent
    ],
  imports: [
    CommonModule,
    MovieDetailsRoutingModule,
    SharedModule,
    MatGridListModule,
    MatDividerModule
  ]
})

export class MovieDetailsModule { }
