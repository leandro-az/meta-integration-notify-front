import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeadService } from '../services/lead.service';
import { Lead } from '../models/lead';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss'],
})
export class LeadComponent implements OnInit {
  lead?: Lead;
  svgIcon: string = 'svg-1';
  constructor(
    private leadService: LeadService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.svgIcon = `svg-${Math.floor(Math.random() * 15) + 1}`;
    this.route.params.subscribe((params) => {
      const id = params['leadId'];

      this.leadService.leadsSet.subscribe((lead) => {
        if (lead.length == 0) return;
        this.lead = this.leadService.leadById(id);
      });

      console.log('lead', this.lead);
    });
  }

  backToHome() {
    this.router.navigate(['leads']);
  }
}
