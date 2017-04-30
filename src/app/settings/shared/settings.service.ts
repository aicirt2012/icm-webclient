import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RequestMethod} from '@angular/http';
import {HttpService, AuthService} from '../../shared';

@Injectable()
export class SettingsService {

  constructor(private _httpService: HttpService, private _authService: AuthService) {
  }

  getUserInfo(): Observable<any> {
    return this._httpService.get('users/'+this._authService.parseToken(this._authService.token).user._id, null, null);
  }

  updateUserInfo(user: any): Observable<any> {
    return this._httpService.put('users/'+this._authService.parseToken(this._authService.token).user._id, null, user);
  }

  updateEmailConfig(emailConfig: any): Observable<any> {
    let body = {
      provider: {}
    }
    body.provider = emailConfig;
    return this._httpService.put('users/'+this._authService.parseToken(this._authService.token).user._id, null, body);
  }

  updateScConfig(scConfig: any): Observable<any> {
    let body = {
      sociocortex: {}
    }
    body.sociocortex = scConfig;
    return this._httpService.put('users/'+this._authService.parseToken(this._authService.token).user._id, null, body);
  }

  getPatterns(): Observable<any> {
    return this._httpService.get('pattern', null, null);
  }

  createPattern(pattern: string): Observable<any> {
    const body = {
      pattern: pattern
    };
    return this._httpService.post('pattern', '', null, body);
  }

  deletePattern(pattern: any): Observable<any> {
    return this._httpService.delete('pattern/'+pattern._id, null, null);
  }
}
