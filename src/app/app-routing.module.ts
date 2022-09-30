import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { LeadDashboardComponent } from '../app/lead-dashboard/lead-dashboard.component';
import { MainComponent } from './main/main.component';
import { RegistrationScreenComponent } from './registration-screen/registration-screen.component';
import { IntegrationComponent } from './integration/integration.component';

const routes: Routes = [
  { path: '', redirectTo: '/main/leads', pathMatch: 'full' },
  { path: 'registration', component: RegistrationScreenComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'leads',
        component: LeadDashboardComponent,
      },
      { 
        path: 'integration',
       component: IntegrationComponent 
      },
      {
        path: '',
        redirectTo: 'leads',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
  { path: '**', redirectTo: '/main/leads' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
