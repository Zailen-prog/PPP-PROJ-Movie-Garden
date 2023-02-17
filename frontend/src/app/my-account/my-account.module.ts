import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared-module/shared.module";
import {CommonModule} from "@angular/common";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDividerModule} from "@angular/material/divider";
import {MyAccountComponent} from "./my-account.component";
import {MyAccountRoutingModule} from "./my-account-routing.module";

@NgModule({
     declarations: [
       MyAccountComponent
     ],
    exports: [
      MyAccountComponent
    ],
  imports: [
    CommonModule,
    SharedModule,
    MyAccountRoutingModule,
    MatGridListModule,
    MatDividerModule
  ]
})

export class MyAccountModule { }
