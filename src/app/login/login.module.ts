import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login.component"
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {LoginGuard} from "./login.guard"

const ROUTES: Routes = [
  {
    path: "",
    component: LoginComponent,
    outlet: "login"
  }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class LoginModule { }
