import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Lead } from '../models/lead';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeadService } from '../services/lead.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LeadStatus } from '../constants/lead-status.constant';
import { SessionService } from '../services/session.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-leads-employee-dialog',
  templateUrl: './leads-employee-dialog.component.html',
  styleUrls: ['./leads-employee-dialog.component.scss'],
})
export class LeadsEmployeeDialogComponent implements OnInit {
  leadsData: Lead[] = [];
  lead?: Lead;
  userRelated=""
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LeadsEmployeeDialogComponent>,
    private leadService: LeadService,
    private sessionService: SessionService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) {userRelated}: any
  ) {
    this.userRelated=userRelated
  }

  ngOnInit(): void {
    this.leadService.getleadsByUserIdAsync(this.userRelated).then((result) => {
      this.leadsData = [...result];
    }).catch(err=>{console.log(err)});

    console.log('LeadsEmployeeDialogComponent');
  }

  onCancel() {
    this.dialogRef.close();
  }
}
