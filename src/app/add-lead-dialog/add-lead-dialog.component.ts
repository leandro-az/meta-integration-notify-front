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

@Component({
  selector: 'app-add-lead-dialog',
  templateUrl: './add-lead-dialog.component.html',
  styleUrls: ['./add-lead-dialog.component.scss']
})
export class AddLeadDialogComponent implements OnInit {

  @ViewChild('leadId', { static: true }) leadIddvalue?: ElementRef;
  @ViewChild('indexvalue', { static: true }) indexvalue!: ElementRef;
  form: FormGroup;
  statusOptions = [...Object.keys(LeadStatus)];
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddLeadDialogComponent>,
    private leadService: LeadService,
    private sessionService : SessionService
  ) {
    this.form = fb.group({
      email: [""],
      name: [""],
      phone: [""],
      age: [0],
      obs: [""],
      valor_total_plano: [0],
      status: [""],
      // createdAt: [createdAt],
      // index: [index],
    });
  }

  ngOnInit() {
    console.log('AddLeadDialogComponent');
  }

  onEdit() {
    this.leadService
     .addLead(this.form.value,this.sessionService.getUserIdSession())
      .then((data) => {
        this.dialogRef.close(data);
      });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
