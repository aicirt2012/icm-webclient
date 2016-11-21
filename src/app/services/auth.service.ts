import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  public token: string;
  private baseUrl: string = 'http://localhost:4000';

  constructor(private http: Http) {
    if (localStorage.getItem('email-jwt')) {
      this.token = localStorage.getItem('email-jwt');
    }
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(`${this.baseUrl}/api/auth/login`, { username: username, password: password })
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

  logout(): void {
    this.token = null;
    localStorage.removeItem('email-jwt');
  }

  isAuthenticated() {
    if (localStorage.getItem('email-jwt')) {
      return true;
    } else {
      return false;
    }
  }
}
