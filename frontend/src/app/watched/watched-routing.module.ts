import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {WatchedComponent} from "./watched.component";

const routes: Routes = [
    {
        path: '',
        component: WatchedComponent,
    },
    {path: '**', redirectTo: '/watched'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [
  ],
  exports: [RouterModule]
})
export class WatchedRoutingModule { }
