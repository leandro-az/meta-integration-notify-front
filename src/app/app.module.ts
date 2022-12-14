import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { LoginComponent } from './login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LeadListComponent } from './lead-list/lead-list.component';
import {EmployeeListComponent} from './employee-list/employee-list.component'
import { EditLeadDialogComponent } from './edit-lead-dialog/edit-lead-dialog.component';
import { LeadDashboardComponent } from './lead-dashboard/lead-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { GraphQLModule } from './graphql/graphql.module';
import {RegistrationScreenComponent} from './registration-screen/registration-screen.component';
import { AddLeadDialogComponent } from './add-lead-dialog/add-lead-dialog.component';
import { IntegrationComponent } from './integration/integration.component';
import { AddEmployeeDialogComponent } from './add-employee-dialog/add-employee-dialog.component'
import {EditEmployeeDialogComponent} from './edit-employee-dialog/edit-employee-dialog.component';
import { LeadsEmployeeDialogComponent } from './leads-employee-dialog/leads-employee-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    LeadListComponent,
    LeadDashboardComponent,
    EditLeadDialogComponent,
    MainComponent,
    RegistrationScreenComponent,
    AddLeadDialogComponent,
    IntegrationComponent,
    AddEmployeeDialogComponent,
    EmployeeListComponent,
    EditEmployeeDialogComponent,
    LeadsEmployeeDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GraphQLModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.google_client_id),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [EditLeadDialogComponent],
})
export class AppModule {}
