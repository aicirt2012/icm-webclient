import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RequestMethod} from '@angular/http';
import {HttpService, AuthService} from '../../shared';

@Injectable()
export class UserService {

  constructor(private http: HttpService, private authService: AuthService) {
  }

  public getUserInfo(): Observable<any> {
    return this.http.get('users/me', null, null);
  }

  public updateUserInfo(user: any): Observable<any> {
    return this.http.put('users/me', null, user);
  }

  public updateEmailConfig(emailConfig: any): Observable<any> {
    let body = {
      provider: emailConfig
    }
    return this.http.put('users/me', null, body);
  }

  public updateScConfig(scConfig: any): Observable<any> {
    let body = {
      sociocortex: scConfig
    }
    return this.http.put('users/me', null, body);
  }

  public updateEmailProviderGMail(settings: any): Observable<any> {
    return this.http.post('users/me/provider/email/gmail', null, settings);
  }

  public updateContactProviderSocioCortex(settings: any): Observable<any> {
    return this.http.post('users/me/provider/contacts/sociocortex', null, settings);
  }

  public getPatterns(): Observable<any> {
    return this.http.get('patterns', null, null);
  }

  public createPattern(pattern: string,matchTillSentenceEnd:boolean,caseSensitive:boolean): Observable<any> {
    const body = {

      pattern: pattern,
      matchTillSentenceEnd: matchTillSentenceEnd,
      caseSensitive:caseSensitive,

    };
    return this.http.post('patterns', null, body);
  }

  public deletePattern(pattern: any): Observable<any> {
    return this.http.delete('patterns/'+pattern._id, null, null);
  }
}
