import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FavoritesComponent} from "./favorites.component";

const routes: Routes = [
    {
        path: '',
        component: FavoritesComponent,
    },
    {path: '**', redirectTo: '/reviews'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [
  ],
  exports: [RouterModule]
})
export class FavoritesRoutingModule { }
