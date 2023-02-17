import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TowatchComponent} from "./towatch.component";

const routes: Routes = [
    {
        path: '',
        component: TowatchComponent,
    },
    {path: '**', redirectTo: '/myReview'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [
  ],
  exports: [RouterModule]
})
export class TowatchRoutingModule { }
