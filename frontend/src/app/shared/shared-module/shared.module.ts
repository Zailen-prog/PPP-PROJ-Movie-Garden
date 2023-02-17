import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MovieCardComponent} from "../../movie-card/movie-card.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {CardInfoComponent} from "../../movie-card/card-info/card-info.component";
import {MatDividerModule} from "@angular/material/divider";
import {CardRateComponent} from "../../movie-card/card-rate/card-rate.component";
import {PrimaryButtonComponent} from "../controls/primary-button/primary-button.component";
import {LayoutLoginComponent} from "../../layouts/layout-login/layout-login.component";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterModule, RouterOutlet} from "@angular/router";
import { LayoutComponentLogout} from "../../layouts/layout-logout/layout-logout.component";
import {ReviewCardComponent} from "../controls/review-card/review-card.component";
import {ActionButtonComponent} from "../controls/action-button/action-button.component";
import {DeleteButtonComponent} from "../controls/delete-button/delete-button.component";
import {FiltersComponent} from "../controls/filters/filters.component";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    MovieCardComponent,
    CardInfoComponent,
    CardRateComponent,
    PrimaryButtonComponent,
    LayoutLoginComponent,
    LayoutComponentLogout,
    ReviewCardComponent,
    ActionButtonComponent,
    DeleteButtonComponent,
    FiltersComponent,

  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatPaginatorModule,
    MatMenuModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule,
    MatSidenavModule,
    RouterOutlet,
    RouterModule,
    MatSelectModule,


  ],
  exports: [
    MatIconModule,
    MatPaginatorModule,
    MatMenuModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MovieCardComponent,
    CardInfoComponent,
    CardRateComponent,
    PrimaryButtonComponent,
    LayoutLoginComponent,
    LayoutComponentLogout,
    ReviewCardComponent,
    ActionButtonComponent,
    DeleteButtonComponent,
    FiltersComponent,
  ]
})
export class SharedModule { }
