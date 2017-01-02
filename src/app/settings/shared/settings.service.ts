import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RequestMethod} from '@angular/http';
import {HttpService, AuthService} from '../../shared';

@Injectable()
export class SettingsService {

  private domain = '/users';
  private body: any;

  constructor(private _httpService: HttpService, private _authService: AuthService) {
  }

  getUserInfo(): Observable<any> {
    return this._httpService.generateRequest(RequestMethod.Get, this.domain, this._authService.parseToken(localStorage.getItem('email-jwt')).user._id, null, null);
  }

  updateEmailConfig(emailConfig: any, provider: string): Observable<any> {

    if(provider == 'gmail'){
      this.body = {
        google: {
          ...emailConfig
        }
      };
    } 
    return this._httpService.generateRequest(
      RequestMethod.Put,
      this.domain,this._authService.parseToken(localStorage.getItem('email-jwt')).user._id,
      null,
      this.body
    );
  }
}
