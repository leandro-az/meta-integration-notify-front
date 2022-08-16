import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { Employee } from '../models/employee';
import { FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-employee-dialog',
  templateUrl: './new-employee-dialog.component.html',
  styleUrls: ['./new-employee-dialog.component.scss'],
})
export class NewEmployeeDialogComponent implements OnInit {
  employee: Employee = new Employee();

  avatars = ['svg-1', 'svg-2', 'svg-3', 'svg-4'];
  constructor(
    private dialogRef: MatDialogRef<NewEmployeeDialogComponent>,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.employee = new Employee();
  }
  onSave() {
    this.employeeService.addEmployee(this.employee).then((emp) => {
      this.dialogRef.close(emp);
    });
  }
  onCancel() {
    this.dialogRef.close(null);
  }
}
