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

@Component({
  selector: 'app-edit-lead-dialog',
  templateUrl: './edit-lead-dialog.component.html',
  styleUrls: ['./edit-lead-dialog.component.scss'],
})
export class EditLeadDialogComponent implements OnInit {
  @ViewChild('leadId', { static: true }) leadIddvalue?: ElementRef;
  @ViewChild('indexvalue', { static: true }) indexvalue!: ElementRef;
  form: FormGroup;
  avatars = ['svg-1', 'svg-2', 'svg-3', 'svg-4'];
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditLeadDialogComponent>,
    private leadService: LeadService,
    @Inject(MAT_DIALOG_DATA)
    { leadId, email, name, age, obs }: Lead
  ) {
    this.form = fb.group({
      leadId: [leadId],
      email: [email],
      name: [name],
      age: [age],
      obs: [obs],
      // index: [index],
    });
  }

  ngOnInit() {
    console.log('EditLeadDialogComponent');
  }

  onEdit() {
    this.leadService
      .update(this.indexvalue.nativeElement.value, this.form.value)
      .then((lead) => {
        this.dialogRef.close(lead);
      });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
