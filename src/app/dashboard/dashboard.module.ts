import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ChartModule } from "primeng/chart";
import { DashboardComponent } from './dashboard.component';


const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];


@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES), ChartModule]
})
export class DashboardModule {}
