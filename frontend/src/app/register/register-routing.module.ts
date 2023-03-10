import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RegisterComponent} from "./register.component";


const routes: Routes = [
    {
        path: '',
        component: RegisterComponent,
    },
    {path: '**', redirectTo: '/test'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [
  ],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
