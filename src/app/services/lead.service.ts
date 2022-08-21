import { Injectable } from '@angular/core';
import { Lead } from '../models/lead';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  private _leadsSet: BehaviorSubject<Lead[]>;

  private dataStore: {
    leadsSet: Lead[];
  };

  //this will allow components to subscribe to this behavior subject
  constructor(private http: HttpClient) {
    this.dataStore = { leadsSet: [] };
    this._leadsSet = new BehaviorSubject<Lead[]>([]);
  }

  get leadsSet(): Observable<Lead[]> {
    return this._leadsSet.asObservable();
  }

  getJSON() {
    return (
      this.http.get<Lead[]>('assets/leadData.json').subscribe((data) => {
        this.dataStore.leadsSet = data;
        this._leadsSet.next(this.dataStore.leadsSet);
      }),
      catchError((error) => {
        return throwError('Unable to fetch leads set!');
      })
    );
  }

  leadById(id: string) {
    return this.dataStore.leadsSet.find((x) => x.leadId == id);
  }

  addLead(lead: Lead): Promise<Lead> {
    return new Promise((resolver, reject) => {
      this.dataStore.leadsSet.push(lead);
      this._leadsSet.next(Object.assign({}, this.dataStore).leadsSet);
      resolver(lead);
    });
  }

  update(index: number, lead: Lead): Promise<Lead> {
    return new Promise((resolver, reject) => {
      this.dataStore.leadsSet[index] = lead;
      this._leadsSet.next(Object.assign({}, this.dataStore).leadsSet);
      resolver(lead);
    });
  }

  deleteLead(id: string) {
    console.log(`Delete lead: ${id}`);
  }
}
