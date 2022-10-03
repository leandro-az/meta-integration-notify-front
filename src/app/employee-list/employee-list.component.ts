import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBarRef,
  SimpleSnackBar,
  MatSnackBar,
} from '@angular/material/snack-bar';
import {} from '@angular/material/';
import { AddEmployeeDialogComponent } from '../add-employee-dialog/add-employee-dialog.component';
import { EditEmployeeDialogComponent } from '../edit-employee-dialog/edit-employee-dialog.component';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  @Input() employeesData?: Observable<User[]>;
  employee?: User;
  constructor(
    private employeeService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.employeesData = this.employeeService.usersSet;
    this.employeeService.getEmployessByManager(
      this.sessionService.getUserIdSession()
    );
    this.employeesData.subscribe((data) => {
      console.log('OLHA os dadoss2');
      console.log(data);
    });
  }

  __cardClick(employee: User) {
    console.log(employee);
    this.router.navigate(['employees', employee.userId]);
  }

  openUserDialog(index: number, { userId, email, name, createdAt }: User) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.data = {
      email,
      name,
      createdAt,
      index,
      userId,
    };
    const dialogRef = this.dialog.open(
      EditEmployeeDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((val) => {
      console.log('Dialog output:', val);
      this.ngOnInit();
    });
  }

  openAddUserDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.data = { userRelated: '' };
    const dialogRef = this.dialog.open(
      AddEmployeeDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((val) => {
      console.log('Dialog output:', val);
      this.ngOnInit();
    });
  }

  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  deleteItem(userId: string) {
    this.employeeService
      .deleteUserEmployee(userId)
      .then(() => {
        console.log('Deleted');
        this.ngOnInit();
      })
      .catch(() => {
        console.log('not deleted');
      });
  }
  
}
