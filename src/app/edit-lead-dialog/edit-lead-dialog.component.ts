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
  selector: 'app-edit-lead-dialog',
  templateUrl: './edit-lead-dialog.component.html',
  styleUrls: ['./edit-lead-dialog.component.scss'],
})
export class EditLeadDialogComponent implements OnInit {
  @ViewChild('leadId', { static: true }) leadIddvalue?: ElementRef;
  @ViewChild('indexvalue', { static: true }) indexvalue!: ElementRef;
  name: string | undefined | null = '';
  form: FormGroup;
  avatars = ['svg-1', 'svg-2', 'svg-3', 'svg-4'];
  statusOptions = [...Object.keys(LeadStatus)];
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditLeadDialogComponent>,
    private leadService: LeadService,
    @Inject(MAT_DIALOG_DATA)
    {
      leadId,
      email,
      name,
      age,
      obs,
      valor_total_plano,
      status,
      createdAt,
    }: Lead
  ) {
    this.form = fb.group({
      leadId: [leadId],
      email: [email],
      name: [name],
      age: [age],
      obs: [obs],
      valor_total_plano: [valor_total_plano],
      status: [status],
      createdAt: [createdAt],
      // index: [index],
    });
    this.name = name;
  }

  ngOnInit() {
    console.log('EditLeadDialogComponent');
  }

  onEdit() {
    this.leadService
     .updateLead(this.form.value)
      .then((lead) => {
        this.dialogRef.close(lead);
      });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
