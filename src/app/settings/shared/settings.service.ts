import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RequestMethod} from '@angular/http';
import {HttpService, AuthService} from '../../shared';

@Injectable()
export class SettingsService {

  private domain = '/users';

  constructor(private _httpService: HttpService, private _authService: AuthService) {
  }

  getUserInfo(): Observable<any> {
    return this._httpService.generateRequest(RequestMethod.Get, this.domain, this._authService.parseToken(localStorage.getItem('email-jwt')).user._id, null, null);
  }

  updateUserInfo(user: any): Observable<any> {
    return this._httpService.generateRequest(
      RequestMethod.Put,
      this.domain,this._authService.parseToken(this._authService.token).user._id,
      null,
      user
    );
  }

  updateEmailConfig(emailConfig: any): Observable<any> {
    let body = {
      provider: {}
    }
    body.provider = emailConfig;
    return this._httpService.generateRequest(
      RequestMethod.Put,
      this.domain,this._authService.parseToken(this._authService.token).user._id,
      null,
      body
    );
  }

  updateScConfig(scConfig: any): Observable<any> {
    let body = {
      sociocortex: {}
    }
    body.sociocortex = scConfig;
    return this._httpService.generateRequest(
      RequestMethod.Put,
      this.domain,this._authService.parseToken(this._authService.token).user._id,
      null,
      body
    );
  }
}
