import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Email} from '../../client';
import {AuthService} from './auth.service';
import C from '../constants';


@Injectable()
export class HttpService {
  constructor(private _http: Http, private _auth: AuthService) {
  }

  get(path: string, params?: any, body?: any): Observable<any> {
    return this.generateRequest(RequestMethod.Get, path, params, body);
  }

  post(path: string, params?: any, body?: any): Observable<any> {
    return this.generateRequest(RequestMethod.Post, path, params, body);
  }

  put(path: string, params?: any, body?: any): Observable<any> {
    return this.generateRequest(RequestMethod.Put, path, params, body);
  }

  delete(path: string, params?: any, body?: any): Observable<any> {
    return this.generateRequest(RequestMethod.Delete, path, params, body);
  }

  options(path: string, params?: any, body?: any): Observable<any> {
    return this.generateRequest(RequestMethod.Options, path, params, body);
  }

  head(path: string, params?: any, body?: any): Observable<any> {
    return this.generateRequest(RequestMethod.Head, path, params, body);
  }

  patch(path: string, params?: any, body?: any): Observable<any> {
    return this.generateRequest(RequestMethod.Patch, path, params, body);
  }

  generateRequest(method: RequestMethod, path: string, params?: any, body?: any): Observable<any> {
    const headers = new Headers({ 'Authorization': `JWT ${this._auth.token}`, 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, method: method, body: body });
    return this._http.request(`${C.server}/${path}${this.generateParams(params)}`, options)
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
