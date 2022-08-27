import { Component, Input, OnInit } from '@angular/core';
import { LeadService } from '../services/lead.service';
import { Observable } from 'rxjs';
import { Lead } from '../models/lead';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBarRef,
  SimpleSnackBar,
  MatSnackBar,
} from '@angular/material/snack-bar';
import {} from '@angular/material/';
import { EditLeadDialogComponent } from '../edit-lead-dialog/edit-lead-dialog.component';

@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.scss'],
})
export class LeadListComponent implements OnInit {
  @Input() leadsData?: Observable<Lead[]>;
  lead?: Lead;
  constructor(
    private leadService: LeadService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.leadsData = this.leadService.leadsSet;
    this.leadService.getleadsByUserId('');
    this.leadsData.subscribe((data) => {
      console.log('OLHA os dadoss2');
      console.log(data);
    });
  }

  __cardClick(lead: Lead) {
    console.log(lead);
    this.router.navigate(['leads', lead.leadId]);
  }

  openLeadDialog(
    index: number,
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
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.data = {
      leadId,
      email,
      name,
      age,
      obs,
      valor_total_plano,
      status,
      createdAt,
      index,
    };
    const dialogRef = this.dialog.open(EditLeadDialogComponent, dialogConfig);
    dialogRef
      .afterClosed()
      .subscribe((val) => console.log('Dialog output:', val));
  }

  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  deleteItem(id: string) {
    this.leadService.deleteLead(id);
  }
  getSvgIcon(): string {
    return `svg-${Math.floor(Math.random() * 15) + 1}`;
  }
}
