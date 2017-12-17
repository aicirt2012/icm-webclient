import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import C from '../constants';

@Injectable()
export class AuthService {
  public token: string;

  constructor(private http: Http) {
    if (localStorage.getItem('email-jwt')) {
      this.token = localStorage.getItem('email-jwt');
    }
  }

  public signUp(username: string, password: string): Observable<any> {
    return this.http.post(C.server + '/users/signup', {username: username, password: password});
  }

  public login(username: string, password: string): Observable<boolean> {
    return this.http.post(`${C.server}/auth/login`, { username: username, password: password })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        if (token) {
          this.token = token;
          localStorage.setItem('email-jwt', token);
          return true;
        } else {
          return false;
        }
      });
  }

  public logout(): void {
    this.token = null;
    localStorage.removeItem('email-jwt');
  }

  public isAuthenticated() {
    const token = localStorage.getItem('email-jwt');
    if (token) {
      if (new Date() > new Date(this.parseToken(token).exp * 1000)) {
        localStorage.removeItem('email-jwt');
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  public getParsedToken(){
    return this.parseToken(this.token);
  }

  public getUserId(){
    return this.getParsedToken().user._id;
  }

  private parseToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
 
}
