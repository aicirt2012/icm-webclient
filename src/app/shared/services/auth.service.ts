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

  login(username: string, password: string): Observable<boolean> {
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

  signup(username: string, password: string): Observable<any> {
    return this.http.post(`${C.server}/users`, { username: username, password: password });
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('email-jwt');
  }

  isAuthenticated() {
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

  parseToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
}
