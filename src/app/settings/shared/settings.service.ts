import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RequestMethod} from '@angular/http';
import {HttpService, AuthService} from '../../shared';

@Injectable()
export class SettingsService {

  constructor(private http: HttpService, private _authService: AuthService) {
  }

  getUserInfo(): Observable<any> {
    return this.http.get('users/'+this._authService.parseToken(this._authService.token).user._id, null, null);
  }

  updateUserInfo(user: any): Observable<any> {
    return this.http.put('users/'+this._authService.parseToken(this._authService.token).user._id, null, user);
  }

  updateEmailConfig(emailConfig: any): Observable<any> {
    let body = {
      provider: {}
    }
    body.provider = emailConfig;
    return this.http.put('users/'+this._authService.parseToken(this._authService.token).user._id, null, body);
  }

  updateScConfig(scConfig: any): Observable<any> {
    let body = {
      sociocortex: {}
    }
    body.sociocortex = scConfig;
    return this.http.put('users/'+this._authService.parseToken(this._authService.token).user._id, null, body);
  }

  getPatterns(): Observable<any> {
    return this.http.get('pattern', null, null);
  }

  createPattern(pattern: string): Observable<any> {
    const body = {
      pattern: pattern
    };
    return this.http.post('pattern', null, body);
  }

  deletePattern(pattern: any): Observable<any> {
    return this.http.delete('pattern/'+pattern._id, null, null);
  }
}
