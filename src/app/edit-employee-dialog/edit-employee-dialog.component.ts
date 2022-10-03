import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { User } from '../models/user';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-employee-dialog',
  templateUrl: './edit-employee-dialog.component.html',
  styleUrls: ['./edit-employee-dialog.component.scss']
})
export class EditEmployeeDialogComponent implements OnInit {
  @ViewChild('leadId', { static: true }) leadIddvalue?: ElementRef;
  @ViewChild('indexvalue', { static: true }) indexvalue!: ElementRef;
  name: string | undefined | null = '';
  form: FormGroup;
  createdAtFormated=""
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditEmployeeDialogComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA)
    {
      userId,
      email,
      name,
      createdAt,
    }: User,
  ) {
    this.form = fb.group({
      userId: [userId],
      email: [email],
      name: [name],
      createdAt: [createdAt],
      // index: [index],
    });
    this.createdAtFormated=(new Date(parseInt(createdAt,10)).toLocaleString())
    this.name = name;
  }

  ngOnInit() {
    console.log('EditEmployeeDialogComponent');
  }

  onEdit() {
    this.userService
     .updateUser(this.form.value)
      .then((lead) => {
        this.dialogRef.close(lead);
      });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
