import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Email} from '../models';
import {AuthService} from './auth.service';
import C from '../constants';


@Injectable()
export class HttpService {
  constructor(private _http: Http, private _auth: AuthService) {
  }

  generateRequest(method: RequestMethod, domain: string, endpoint?: string, params?: any, body?: any): Observable<any> {
    const headers = new Headers({ 'Authorization': `JWT ${this._auth.token}`, 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, method: method, body: body });
    const pathEndpoint = endpoint ? `/${endpoint}` : '';
    const path = `${domain}${pathEndpoint}`;
    return this._http.request(`${C.server}${path}${this.generateParams(params)}`, options)
      .map((response: Response) => response.json());
  }

  generateParams(params?: any) {
    let queryString = '?';
    if (params) {
      Object.keys(params).forEach((key) => {
        queryString += `${key}=${params[key]}&`;
      })
    }
    return queryString.slice(0, -1);
  }

}
