import { NgModule } from '@angular/core';
import {HomeComponent} from "./home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {SharedModule} from "../shared/shared-module/shared.module";
import {CommonModule} from "@angular/common";

@NgModule({
     declarations: [
         HomeComponent
     ],
    exports: [
         HomeComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule
    ]
})

export class HomeModule { }
