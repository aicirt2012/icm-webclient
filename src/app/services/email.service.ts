import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Email} from '../models';
import {AuthService} from './auth.service';

@Injectable()
export class EmailService {

  private actionUrl: string;
  private headers: Headers;
  private token: string;
  private baseUrl:string = 'http://localhost:4000/api/email/';

  constructor(private _http: Http, private _auth: AuthService) {
  }
  
  getEmails(): Observable<Email[]> {
    // add authorization header with jwt token
    const headers = new Headers({ 'Authorization': `JWT ${this._auth.token}` });
    const options = new RequestOptions({ headers: headers });
    return this._http.get(`${this.baseUrl}inBox`, options)
      .map((response: Response) => response.json());
  }

  public getAllMails = (): Observable<Response> => {
    const req = this._http.get(this.actionUrl, { headers: this.headers });
    return req.map(res => res.json());
  }

  public getAllMailsInbox = (): Observable<Response> => {
    const req = this._http.get(this.actionUrl + 'inBox', { headers: this.headers });
    return req.map(res => res.json());
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
