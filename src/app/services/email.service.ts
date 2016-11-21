import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map'
import {Observable} from 'rxjs/Observable';
import {Email} from './models/email.model';

@Injectable()
export class EmailService {

  private actionUrl: string;
  private headers: Headers;
  private token: string;

  constructor(private _http: Http) {
    //at the moment use fixed token --> just login via postman and copy token
    this.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU4MmYzYjI1OGIwOTY5Mjg0NGM2NTc0NSIsInVzZXJuYW1lIjoiUGV0ZXIiLCJlbWFpbCI6InBldGVyQG5pZWRlcm1laWVyLWVkLmRlIn0sImlhdCI6MTQ3OTcyMjU3NiwiZXhwIjoxNDc5ODA4OTc2fQ.CiC4qJAYMRM8cZZ3INvSex0nVBvm-caiKKqvPnR4D3o";
    this.actionUrl = 'http://localhost:4000/api/email/';

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.headers.append('Authorization', 'JWT ' + this.token);
  }

  public getAllMails = (): Observable<Response> => {
    return this._http.get(this.actionUrl, { headers: this.headers }).map(res => res.json());
  }

  public getAllMailsInbox = (): Observable<Response> => {
    return this._http.get(this.actionUrl + "inBox", { headers: this.headers }).map(res => res.json());
  }

  public getAllMailsDraft = (): Observable<Response> => {
    return this._http.get(this.actionUrl + "draftBox", { headers: this.headers }).map(res => res.json());
  }

  public getAllMailsTrash = (): Observable<Response> => {
    return this._http.get(this.actionUrl + "trashBox", { headers: this.headers }).map(res => res.json());
  }

  public getAllMailsSend = (): Observable<Response> => {
    return this._http.get(this.actionUrl + "sendBox", { headers: this.headers }).map(res => res.json());
  }

  public getAllBoxes = (): Observable<Response> => {
    return this._http.get(this.actionUrl + "boxes", { headers: this.headers }).map(res => res.json());
  }

}
