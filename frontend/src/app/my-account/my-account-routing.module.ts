import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MyAccountComponent} from "./my-account.component";


const routes: Routes = [
    {
        path: '',
        component: MyAccountComponent,
    },
    {path: '**', redirectTo: '/test'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [
  ],
  exports: [RouterModule]
})
export class MyAccountRoutingModule { }
