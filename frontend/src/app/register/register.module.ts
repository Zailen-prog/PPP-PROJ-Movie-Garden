import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared-module/shared.module";
import {CommonModule} from "@angular/common";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDividerModule} from "@angular/material/divider";
import {RegisterComponent} from "./register.component";
import {RegisterRoutingModule} from "./register-routing.module";

@NgModule({
     declarations: [
       RegisterComponent,
     ],
    exports: [
      RegisterComponent,
    ],
  imports: [
    CommonModule,
    SharedModule,
    MatGridListModule,
    MatDividerModule,
    RegisterRoutingModule

  ]
})

export class RegisterModule { }
