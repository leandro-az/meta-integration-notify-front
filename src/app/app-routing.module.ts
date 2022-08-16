import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeemanagerAppComponent } from '../app/employeemanager/employeemanager-app.component';
import { MainContentComponent } from '../app/main-content/main-content.component';
import { DetailviewComponent } from '../app/detailview/detailview.component';
import { LoginComponent } from '../app/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '/emp',
    component: EmployeemanagerAppComponent,
    children: [
      { path: ':id', component: DetailviewComponent },
      { path: '', component: MainContentComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
