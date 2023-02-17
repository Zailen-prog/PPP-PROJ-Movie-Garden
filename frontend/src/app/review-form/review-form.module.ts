import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared-module/shared.module";
import {CommonModule} from "@angular/common";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDividerModule} from "@angular/material/divider";
import {ReviewFormComponent} from "./review-form.component";
import {ReviewFormRoutingModule} from "./review-form-routing.module";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
     declarations: [
       ReviewFormComponent
     ],
    exports: [
      ReviewFormComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ReviewFormRoutingModule,
        MatGridListModule,
        MatDividerModule,
        MatSelectModule
    ]
})

export class ReviewFormModule { }
