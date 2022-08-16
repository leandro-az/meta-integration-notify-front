import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EmployeemanagerAppComponent } from './employeemanager-app.component';
import { MainContentComponent } from '../main-content/main-content.component';
import { HttpClientModule } from '@angular/common/http';
import { NewEmployeeDialogComponent } from '../new-employee-dialog/new-employee-dialog.component';
import { DetailviewComponent } from '../detailview/detailview.component';
import { NotesComponent } from '../notes/notes.component';
import { EditEmployeeDialogComponent } from '../edit-employee-dialog/edit-employee-dialog.component';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [
    EmployeemanagerAppComponent,
    MainContentComponent,
    NewEmployeeDialogComponent,
    DetailviewComponent,
    NotesComponent,
    EditEmployeeDialogComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
  ],
  entryComponents: [NewEmployeeDialogComponent, EditEmployeeDialogComponent],
})
export class EmployeemanagerModule {}
