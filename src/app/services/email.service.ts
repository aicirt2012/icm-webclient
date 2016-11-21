import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Email} from '../models';
import {AuthService} from './auth.service';
import C from '../constants';

@Injectable()
export class EmailService {
  private domain: string = 'email';

  constructor(private _http: Http, private _auth: AuthService) {
  }

  getEmails(endpoint?: string): Observable<any[]> {
    const headers = new Headers({ 'Authorization': `JWT ${this._auth.token}` });
    const options = new RequestOptions({ headers: headers });
    const path = endpoint ? `/${endpoint}` : ``;
    return this._http.get(`${C.server}${this.domain}${path}`, options)
      .map((response: Response) => response.json());
  }

}
