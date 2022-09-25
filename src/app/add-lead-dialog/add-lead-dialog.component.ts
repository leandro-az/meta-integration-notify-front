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

@Component({
  selector: 'app-add-lead-dialog',
  templateUrl: './add-lead-dialog.component.html',
  styleUrls: ['./add-lead-dialog.component.scss']
})
export class AddLeadDialogComponent implements OnInit {

  @ViewChild('leadId', { static: true }) leadIddvalue?: ElementRef;
  @ViewChild('indexvalue', { static: true }) indexvalue!: ElementRef;
  form: FormGroup;
  avatars = ['svg-1', 'svg-2', 'svg-3', 'svg-4'];
  statusOptions = [...Object.keys(LeadStatus)];
  userRelated=""
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddLeadDialogComponent>,
    private leadService: LeadService,
    @Inject(MAT_DIALOG_DATA) {userRelated}: any 
  ) {
    this.form = fb.group({
      leadId: [""],
      email: [""],
      name: [""],
      age: [0],
      obs: [""],
      valor_total_plano: [0],
      status: [""],
      // createdAt: [createdAt],
      // index: [index],
    });
    this.userRelated =userRelated
  }

  ngOnInit() {
    console.log('AddLeadDialogComponent');
  }

  onEdit() {
    this.leadService
     .addLead(this.form.value,this.userRelated)
      .then((data) => {
        this.dialogRef.close(data);
      });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
