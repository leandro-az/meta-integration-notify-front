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
  selector: 'app-edit-lead-dialog',
  templateUrl: './edit-lead-dialog.component.html',
  styleUrls: ['./edit-lead-dialog.component.scss'],
})
export class EditLeadDialogComponent implements OnInit {
  @ViewChild('leadId', { static: true }) leadIddvalue?: ElementRef;
  @ViewChild('indexvalue', { static: true }) indexvalue!: ElementRef;
  name: string | undefined | null = '';
  form: FormGroup;
  statusOptions = [...Object.keys(LeadStatus)];
  usersOptions: User[] = [];
  showUserOptinons = false;
  createdAtFormated = '';
  encarregado=''
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditLeadDialogComponent>,
    private leadService: LeadService,
    private sessionService: SessionService,
    private userService: UserService,
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
      userIdFk2,
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
    this.createdAtFormated = new Date(parseInt(createdAt, 10)).toLocaleString();
    this.name = name;
  }

  ngOnInit() {
    
    this.showUserOptinons =
      this.sessionService.getUserRole() === 1 ? true : false;
    if(this.showUserOptinons){
      this.userService
      .getEmployessByManagerAsync(this.sessionService.getUserIdSession())
      .then(res=>{this.usersOptions=[...res]}).catch(err=>{
        console.log("Error on get users")
      });
    }else{
      this.encarregado=this.sessionService.getUserIdSession()
    }  
    console.log('EditLeadDialogComponent');
  }

  onEdit() {
    this.leadService
      .updateLead(this.form.value,this.encarregado)
      .then((lead) => {
        this.dialogRef.close(lead);
      });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
