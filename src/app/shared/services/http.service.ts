import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Email} from '../../client';
import {AuthService} from './auth.service';
import C from '../constants';
import 'rxjs/Rx';


@Injectable()
export class HttpService {

  constructor(private http: Http, private auth: AuthService) {
  }

  public get(path: string, params?: any, body?: any): Observable<any> {
    return this.generateRequest(RequestMethod.Get, path, params, body);
  }

  public post(path: string, params?: any, body?: any): Observable<any> {
    return this.generateRequest(RequestMethod.Post, path, params, body);
  }

  public put(path: string, params?: any, body?: any): Observable<any> {
    return this.generateRequest(RequestMethod.Put, path, params, body);
  }

  public delete(path: string, params?: any, body?: any): Observable<any> {
    return this.generateRequest(RequestMethod.Delete, path, params, body);
  }

  public options(path: string, params?: any, body?: any): Observable<any> {
    return this.generateRequest(RequestMethod.Options, path, params, body);
  }

  public head(path: string, params?: any, body?: any): Observable<any> {
    return this.generateRequest(RequestMethod.Head, path, params, body);
  }

  public patch(path: string, params?: any, body?: any): Observable<any> {
    return this.generateRequest(RequestMethod.Patch, path, params, body);
  }

  public getBlob(path: string, params?: any, body?: any): Observable<any> {
    return this.generateRequestBlob(RequestMethod.Get, path, params, body);
  }

  private generateRequestBlob(method: RequestMethod, path: string, params?: any, body?: any): Observable<any> {
    const headers = new Headers({ 'Authorization': `JWT ${this.auth.token}`, 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, method: method, body: body, responseType: ResponseContentType.Blob});
    return this.http.request(`${C.server}/${path}${this.generateParams(params)}`, options)
      .map((response: Response) => response.blob());
  }

  private generateRequest(method: RequestMethod, path: string, params?: any, body?: any): Observable<any> {
    const headers = new Headers({ 'Authorization': `JWT ${this.auth.token}`, 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, method: method, body: body });
    return this.http.request(`${C.server}/${path}${this.generateParams(params)}`, options)
      .map((response: Response) => response.json());
  }

  private generateParams(params?: any) {
    let queryString = '?';
    if (params) {
      Object.keys(params).forEach((key) => {
        queryString += `${key}=${params[key]}&`;
      })
    }
    return queryString.slice(0, -1);
  }

}
