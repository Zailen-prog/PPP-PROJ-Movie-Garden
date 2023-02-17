import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared-module/shared.module";
import {CommonModule} from "@angular/common";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDividerModule} from "@angular/material/divider";
import {MatSelectModule} from "@angular/material/select";
import {WatchedComponent} from "./watched.component";
import {WatchedRoutingModule} from "./watched-routing.module";

@NgModule({
     declarations: [
       WatchedComponent,
     ],
    exports: [
      WatchedComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        WatchedRoutingModule,
        MatGridListModule,
        MatDividerModule,
        MatSelectModule
    ]
})

export class WatchedModule { }
