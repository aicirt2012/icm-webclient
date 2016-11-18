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
    this.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBldGVyIiwiaWF0IjoxNDc5NDYxNDI2LCJleHAiOjE0Nzk1NDc4MjZ9.T2ZHwe5A_wFE7cRnMtCBxIHY2DVNL9r3PTa8eEWmJ4w";
    this.actionUrl = 'http://localhost:4000/api/email/';

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.token);
  }

  public getAllMails = (): Observable<Response> => {
    return this._http.get(this.actionUrl, { headers: this.headers }).map(res => res.json());
  }

  public getAllMailsInbox = (): Observable<Response> => {
    return this._http.get(this.actionUrl + "inBox", { headers: this.headers }).map(res => res.json());
  }

  /*  public GetAll = ():Observable<Response> => {
        return this._http.get(this.actionUrl + "list").map(res => res.json());
    }

    public GetSingle = (id:string):Observable<Response> => {
        return this._http.get(this.actionUrl + id).map(res => res.json());
    }

    public Add = (itemName:string):Observable<Response> => {
        var toAdd = JSON.stringify({ItemName: itemName});

        return this._http.post(this.actionUrl, toAdd, {headers: this.headers}).map(res => res.json());
    }

    public Update = (id:string, itemToUpdate:Email):Observable<Response> => {
        return this._http.put(this.actionUrl + id, JSON.stringify(itemToUpdate), {headers: this.headers}).map(res => res.json());
    }

    public Delete = (id:string):Observable<Response> => {
        return this._http.delete(this.actionUrl + id);
    }*/
}
