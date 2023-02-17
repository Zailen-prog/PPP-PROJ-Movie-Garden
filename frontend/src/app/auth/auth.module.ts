import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {AuthRoutingModule} from "./auth-routing.module";
import {AuthComponent} from "./auth.component";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared-module/shared.module";
import {MatDividerModule} from "@angular/material/divider";

@NgModule({
    declarations: [
        AuthComponent
    ],
    exports: [
        AuthComponent
    ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    AuthRoutingModule,
    HttpClientModule,
    SharedModule,
    MatDividerModule
  ],
})
export class AuthModule {
}
