import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { LeadDashboardComponent } from '../app/lead-dashboard/lead-dashboard.component';
import { LeadComponent } from './lead/lead.component';

const routes: Routes = [
  { path: '', redirectTo: '/leads', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'leads',
    component: LeadDashboardComponent,
    children: [{ path: ':leadId', component: LeadComponent }],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
