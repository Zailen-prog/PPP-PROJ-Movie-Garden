import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared-module/shared.module";
import {CommonModule} from "@angular/common";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDividerModule} from "@angular/material/divider";
import {FavoritesComponent} from "./favorites.component";
import {FavoritesRoutingModule} from "./favorites-routing.module";

@NgModule({
     declarations: [
       FavoritesComponent,
     ],
    exports: [
      FavoritesComponent
    ],
  imports: [
    CommonModule,
    SharedModule,
    MatGridListModule,
    MatDividerModule,
    FavoritesRoutingModule
  ]
})

export class FavoritesModule { }
