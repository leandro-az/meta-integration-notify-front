import { Injectable } from '@angular/core';
import { Lead } from '../models/lead';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import {
  mutation_update_lead,
  query_get_leads_by_userId,
  query_get_lead_by_id,
  mutation_add_lead,
  mutation_delete_lead
} from '../graphql/leads.operations'

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  private _leadsSet: BehaviorSubject<Lead[]>;

  private dataStore: {
    leadsSet: Lead[];
  };

  //this will allow components to subscribe to this behavior subject
  constructor(private http: HttpClient, private apollo: Apollo) {
    this.dataStore = { leadsSet: [] };
    this._leadsSet = new BehaviorSubject<Lead[]>([]);
  }

  get leadsSet(): Observable<Lead[]> {
    return this._leadsSet.asObservable();
  }

  updateLead(lead: Lead): Promise<Lead> {
    const updateLeadInput ={
        leadId: lead.leadId,
        email: lead.email,
        phone: lead.phone,
        name: lead.name,
        age: lead.age,
        valor_total_plano: lead.valor_total_plano,
        obs: lead.obs,
        status: lead.status
    }
    return new Promise((resolver, reject) => {
      this.apollo
        .mutate({
          fetchPolicy: 'no-cache',
          mutation:mutation_update_lead,
          variables: {updateLeadInput},
        })
        .subscribe((result: any) => {
          resolver(result.data.lead as Lead);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
  }

  getleadsByUserId(userIdStr: string) {
    return (
      this.apollo
        .watchQuery({
          fetchPolicy: 'no-cache',
          query:query_get_leads_by_userId,
          variables: { userIdStr },
        })
        .valueChanges.subscribe((result: any) => {
          console.log('Result');
          console.log(result.data);
          this.dataStore.leadsSet = result.data.leadsByUser;
          this._leadsSet.next(this.dataStore.leadsSet);
        }),
      catchError((error: any) => {
        throw new Error(error);
      })
    );
  }

  leadById(leadIdStr: string): Promise<Lead> {
    return new Promise((resolver, reject) => {
      this.apollo
        .watchQuery({
          fetchPolicy: 'no-cache',
          query: query_get_lead_by_id ,
          variables: { leadIdStr },
        })
        .valueChanges.subscribe((result: any) => {
          resolver(result.data.lead);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
  }

  addLead(lead: Lead, userRelatedStr: string) {
    const createLeadInput ={
      email: lead.email,
      phone: lead.phone,
      name: lead.name,
      age: lead.age,
      valor_total_plano: lead.valor_total_plano,
      obs: lead.obs,
      status: lead.status
  }
  return new Promise((resolver, reject) => {
    this.apollo.mutate({
      fetchPolicy: 'no-cache',
      mutation: mutation_add_lead ,
      variables: { createLeadInput ,userRelatedStr},
    }).subscribe((result: any) => {
        resolver(result.data.createLead);
      }),
      catchError((error: any) => {
        throw new Error(error);
      });
  });
    
  }

  deleteLead(leadIdStr: string) {

    return new Promise((resolver, reject) => {
      this.apollo.mutate({
        fetchPolicy: 'no-cache',
        mutation: mutation_delete_lead,
        variables: { leadIdStr },
      }).subscribe((result: any) => {
          resolver(result.data.createLead);
        }),
        catchError((error: any) => {
          throw new Error(error);
        });
    });
    
  }
}
