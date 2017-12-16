import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RequestMethod} from '@angular/http';
import {HttpService, AuthService} from '../../shared';

@Injectable()
export class UserService {

  constructor(private http: HttpService, private authService: AuthService) {
  }

  getUserInfo(): Observable<any> {
    return this.http.get('users/'+this.authService.getUserId(), null, null);
  }

  updateUserInfo(user: any): Observable<any> {
    return this.http.put('users/'+this.authService.getUserId(), null, user);
  }

  updateEmailConfig(emailConfig: any): Observable<any> {
    let body = {
      provider: emailConfig
    }
    return this.http.put('users/'+this.authService.getUserId(), null, body);
  }

  updateScConfig(scConfig: any): Observable<any> {
    let body = {
      sociocortex: scConfig
    }
    return this.http.put('users/'+this.authService.getUserId(), null, body);
  }

  updateContactProviderSocioCortex(settings: any): Observable<any> {
    return this.http.post('users/me/provider/contacts/sociocortex', null, settings);
  }

  getPatterns(): Observable<any> {
    return this.http.get('patterns', null, null);
  }

  createPattern(pattern: string): Observable<any> {
    const body = {
      pattern: pattern
    };
    return this.http.post('patterns', null, body);
  }

  deletePattern(pattern: any): Observable<any> {
    return this.http.delete('patterns/'+pattern._id, null, null);
  }
}
