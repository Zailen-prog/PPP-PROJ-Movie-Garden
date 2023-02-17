import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared-module/shared.module";
import {CommonModule} from "@angular/common";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDividerModule} from "@angular/material/divider";
import {TowatchComponent} from "./towatch.component";
import {TowatchRoutingModule} from "./towatch-routing.module";

@NgModule({
     declarations: [
      TowatchComponent
     ],
    exports: [
      TowatchComponent
    ],
  imports: [
    CommonModule,
    SharedModule,
    MatGridListModule,
    MatDividerModule,
    TowatchRoutingModule
  ]
})

export class TowatchModule { }
